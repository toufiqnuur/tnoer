// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import icon from 'astro-icon'

import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
	integrations: [icon()],
	adapter: vercel(),
	vite: {
		plugins: [tailwindcss()]
	}
})
