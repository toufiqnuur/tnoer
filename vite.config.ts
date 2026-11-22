import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import contentCollections from '@content-collections/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig, lazyPlugins } from 'vite-plus'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

type PlaceholderManifest = {
	generated: Array<{ type: string; slug: string }>
}

/**
 * Reads the manifest written by `scripts/generate-placeholders.ts`.
 * Placeholder pages still get prerendered (so their `noindex` metadata ships),
 * but they are excluded from `sitemap.xml`.
 */
function placeholderPages(): Array<{ path: string; sitemap: { exclude: boolean } }> {
	const manifestPath = fileURLToPath(
		new URL('./.contents-generated/manifest.json', import.meta.url)
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

export default defineConfig({
	staged: {
		'*': 'vp check --fix'
	},
	lint: {
		jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
		rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
		options: { typeAware: true, typeCheck: true }
	},
	resolve: {
		tsconfigPaths: true,
		alias: { '~': new URL('./src', import.meta.url).pathname }
	},
	fmt: {
		useTabs: true,
		singleQuote: true,
		trailingComma: 'none',
		semi: false,
		printWidth: 100,
		sortPackageJson: false,
		sortTailwindcss: {
			stylesheet: './src/styles/global.css'
		},
		ignorePatterns: ['node_modules/**']
	},
	plugins: lazyPlugins(() => [
		contentCollections(),
		tailwindcss(),
		tanstackStart({
			pages: [{ path: '/' }, ...placeholderPages()],
			spa: { enabled: true, maskPath: '__shell.html' },
			sitemap: { host: 'me.phiq.workers.dev' },
			prerender: { crawlLinks: true, failOnError: false }
		}),
		viteReact()
	])
})
