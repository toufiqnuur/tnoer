import contentCollections from '@content-collections/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig, lazyPlugins } from 'vite-plus'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { placeholderPages, placeholderPlugin } from './scripts/placeholder-plugin'

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
		placeholderPlugin(),
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
