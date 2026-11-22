import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { extname, join, relative, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'
import {
	CONTENT_REQUIREMENTS,
	CONTENT_TYPES,
	contentSchema,
	type ContentDocument,
	type ContentType
} from '~/features/contents/lib/content-schema'
import { createPostPlaceholder } from './placeholders/post'
import { createTeardownPlaceholder } from './placeholders/teardown'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const OUTPUT_DIR = '.contents-generated'
const GENERATED_SUBDIR = 'posts'

type Manifest = {
	generated: Array<{ type: ContentType; slug: string }>
}

const TEMPLATES: Record<ContentType, (index: number) => ContentDocument> = {
	post: createPostPlaceholder,
	teardown: createTeardownPlaceholder
}

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

function readArg(name: string, fallback: string): string {
	const index = process.argv.indexOf(`--${name}`)
	const value = index === -1 ? undefined : process.argv[index + 1]
	return value ?? fallback
}

function formatIssues(issues: ReadonlyArray<{ path: PropertyKey[]; message: string }>): string {
	return issues
		.map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
		.join('\n')
}

function pad(value: number): string {
	return String(value).padStart(2, '0')
}

async function collectMdxFiles(directory: string): Promise<string[]> {
	const entries = await readdir(directory, { withFileTypes: true })
	const files = await Promise.all(
		entries.map(async (entry) => {
			const path = join(directory, entry.name)
			if (entry.isDirectory()) return collectMdxFiles(path)
			return entry.isFile() && extname(entry.name) === '.mdx' ? [path] : []
		})
	)

	return files.flat()
}

/**
 * Mirrors the content-collections frontmatter parser: the YAML block holds the
 * metadata and the file body becomes `content`.
 */
function parseRealContent(filePath: string, raw: string): ContentDocument {
	const match = FRONTMATTER_PATTERN.exec(raw)
	if (!match) throw new Error(`${filePath}: missing YAML frontmatter`)

	const metadata = parseYaml(match[1]) ?? {}
	const result = contentSchema.safeParse({ ...metadata, content: match[2].trim() })
	if (!result.success) {
		throw new Error(`${filePath}: invalid content\n${formatIssues(result.error.issues)}`)
	}

	return result.data
}

function parseGenerated(filePath: string, document: ContentDocument): ContentDocument {
	const result = contentSchema.safeParse(document)
	if (!result.success) {
		throw new Error(`${filePath}: invalid placeholder\n${formatIssues(result.error.issues)}`)
	}

	return result.data
}

function printReport(report: Record<ContentType, { real: number; generated: number }>): void {
	const lines = ['[Placeholder Generator]', '']

	for (const type of CONTENT_TYPES) {
		const { real, generated } = report[type]
		const minimum = CONTENT_REQUIREMENTS[type]

		lines.push(
			type.toUpperCase(),
			`  ${'Real entries:'.padEnd(20)}${real}`,
			`  ${'Minimum required:'.padEnd(20)}${minimum}`,
			`  ${'Generated:'.padEnd(20)}${generated}`,
			`  ${'Final total:'.padEnd(20)}${real + generated}`,
			''
		)
	}

	lines.push('Generation completed successfully.')
	console.log(lines.join('\n'))
}

async function main(): Promise<void> {
	const contentDir = resolve(ROOT, readArg('content-dir', 'src/contents/posts'))
	const outputDir = resolve(ROOT, readArg('out-dir', OUTPUT_DIR))
	const outputSubdir = join(outputDir, GENERATED_SUBDIR)

	await rm(outputDir, { recursive: true, force: true })
	await mkdir(outputSubdir, { recursive: true })

	const mdxFiles = (await collectMdxFiles(contentDir)).sort()
	const realContent = await Promise.all(
		mdxFiles.map(async (filePath) =>
			parseRealContent(relative(ROOT, filePath), await readFile(filePath, 'utf8'))
		)
	)

	const counts: Record<ContentType, number> = { post: 0, teardown: 0 }
	for (const document of realContent) counts[document.type] += 1

	const manifest: Manifest = { generated: [] }
	const report: Record<ContentType, { real: number; generated: number }> = {
		post: { real: counts.post, generated: 0 },
		teardown: { real: counts.teardown, generated: 0 }
	}

	for (const type of CONTENT_TYPES) {
		const missing = Math.max(0, CONTENT_REQUIREMENTS[type] - counts[type])
		const createPlaceholder = TEMPLATES[type]

		for (let index = 1; index <= missing; index++) {
			const slug = `${type}-placeholder-${pad(index)}`
			const filePath = join(outputSubdir, `${slug}.json`)
			const placeholder = parseGenerated(filePath, createPlaceholder(index))

			if (placeholder.type !== type) {
				throw new Error(`${filePath}: expected type "${type}" but received "${placeholder.type}"`)
			}

			await writeFile(filePath, `${JSON.stringify(placeholder, null, 2)}\n`)
			manifest.generated.push({ type, slug })
		}

		report[type].generated = missing
	}

	await writeFile(join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)

	printReport(report)
}

main().catch((error: unknown) => {
	const message = error instanceof Error ? error.message : String(error)
	console.error(`\n[Placeholder Generator] failed\n${message}\n`)
	process.exitCode = 1
})
