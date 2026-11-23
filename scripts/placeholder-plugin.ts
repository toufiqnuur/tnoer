import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { generatePlaceholders } from './lib/generate-placeholders'

type PlaceholderManifest = {
	generated: Array<{ type: string; slug: string }>
}

/**
 * Reads the manifest written by `scripts/generate-placeholders.ts`.
 * Placeholder pages still get prerendered (so their `noindex` metadata ships),
 * but they are excluded from `sitemap.xml`.
 */
export function placeholderPages(): Array<{ path: string; sitemap: { exclude: boolean } }> {
	const manifestPath = fileURLToPath(
		new URL('../.contents-generated/manifest.json', import.meta.url)
	)
	if (!existsSync(manifestPath)) return []

	try {
		const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as PlaceholderManifest
		return manifest.generated.map(({ slug }) => ({
			path: `/posts/${slug}`,
			sitemap: { exclude: true }
		}))
	} catch (error) {
		console.warn(`[Placeholder Generator] could not read ${manifestPath}:`, error)
		return []
	}
}

/**
 * Runs the placeholder generator before content collections are resolved, so
 * `vite dev`, `vite build` and Alchemy's programmatic Vite builds all get the
 * generated content without relying on the package.json scripts.
 */
export function placeholderPlugin() {
	// Vite resolves the config once per environment; generate only once.
	let generation: Promise<void> | undefined

	return {
		name: 'placeholder-generator',
		async config() {
			generation ??= generatePlaceholders()
			await generation
		}
	}
}
