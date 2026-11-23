import process from 'node:process'
import { generatePlaceholders } from './lib/generate-placeholders'

function readArg(name: string, fallback: string): string {
	const index = process.argv.indexOf(`--${name}`)
	const value = index === -1 ? undefined : process.argv[index + 1]
	return value ?? fallback
}

generatePlaceholders({
	contentDir: readArg('content-dir', 'src/contents/posts'),
	outputDir: readArg('out-dir', '.contents-generated')
}).catch((error: unknown) => {
	const message = error instanceof Error ? error.message : String(error)
	console.error(`\n[Placeholder Generator] failed\n${message}\n`)
	process.exitCode = 1
})
