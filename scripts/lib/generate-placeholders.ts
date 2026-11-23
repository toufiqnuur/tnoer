import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { extname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse as parseYaml } from 'yaml'
import {
	CONTENT_REQUIREMENTS,
	CONTENT_TYPES,
	contentSchema,
	type ContentDocument,
	type ContentType
} from '../../src/features/contents/lib/content-schema'
import { createPostPlaceholder } from '../placeholders/post'
import { createTeardownPlaceholder } from '../placeholders/teardown'

const ROOT = fileURLToPath(new URL('../../', import.meta.url))
const DEFAULT_CONTENT_DIR = 'src/contents/posts'
const DEFAULT_OUTPUT_DIR = '.contents-generated'
const GENERATED_SUBDIR = 'posts'

export type GeneratePlaceholdersOptions = {
	contentDir?: string
	outputDir?: string
	log?: boolean
}

type Manifest = {
	generated: Array<{ type: ContentType; slug: string }>
}

const TEMPLATES: Record<ContentType, (index: number) => ContentDocument> = {
	post: createPostPlaceholder,
	teardown: createTeardownPlaceholder
}

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

function formatIssues(issues: ReadonlyArray<{ path: PropertyKey[]; message: string }>): string {
	return issues
		.map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
		.join('\n')
}

function pad(value: number): string {
	return String(value).padStart(2, '0')
}

/**
 * Missing content directories are treated as "no real entries" rather than an
 * error, so a fresh clone or a deployment without `src/contents` still gets the
 * full set of generated placeholders.
 */
async function collectMdxFiles(directory: string): Promise<string[]> {
	let entries
	try {
		entries = await readdir(directory, { withFileTypes: true })
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === 'ENOENT') return []
		throw error
	}

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

/**
 * Generates placeholder content so every content type reaches its minimum.
 *
 * Everything is parsed and validated into memory before the output directory is
 * touched, so a failure leaves the previous generated output intact.
 */
export async function generatePlaceholders(
	options: GeneratePlaceholdersOptions = {}
): Promise<void> {
	const contentDir = resolve(ROOT, options.contentDir ?? DEFAULT_CONTENT_DIR)
	const outputDir = resolve(ROOT, options.outputDir ?? DEFAULT_OUTPUT_DIR)
	const outputSubdir = join(outputDir, GENERATED_SUBDIR)

	const mdxFiles = (await collectMdxFiles(contentDir)).sort()
	const realContent = await Promise.all(
		mdxFiles.map(async (filePath) =>
			parseRealContent(relative(ROOT, filePath), await readFile(filePath, 'utf8'))
		)
	)

	const counts: Record<ContentType, number> = { post: 0, teardown: 0 }
	for (const document of realContent) counts[document.type] += 1

	const manifest: Manifest = { generated: [] }
	const files: Array<{ path: string; contents: string }> = []
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

			files.push({ path: filePath, contents: `${JSON.stringify(placeholder, null, 2)}\n` })
			manifest.generated.push({ type, slug })
		}

		report[type].generated = missing
	}

	await rm(outputDir, { recursive: true, force: true })
	await mkdir(outputSubdir, { recursive: true })

	for (const file of files) await writeFile(file.path, file.contents)
	await writeFile(join(outputDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)

	if (options.log !== false) printReport(report)
}
