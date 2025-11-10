<script lang="ts">
	let isDark = false

	function toggleTheme() {
		const rootElement = document.documentElement
		const currentTheme = rootElement.getAttribute('data-theme')

		const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

		rootElement.setAttribute('data-theme', newTheme)
		localStorage.setItem('theme', newTheme)

		isDark = newTheme === 'dark'
	}
</script>

<button
	onclick={toggleTheme}
	class="rounded-xl border-r border-b h-10 overflow-hidden border-blue-500 bg-gradient-to-tl from-blue-500/90 to-blue-400/90 p-2 text-sm font-semibold text-white shadow-md backdrop-blur-2xl dark:from-blue-600/90 dark:to-blue-500/90"
	aria-label="Toggle dark mode"
>
	<span
		class="icon-[fluent--weather-sunny-24-filled] block text-2xl transform transition-transform duration-300 {!isDark &&
			'-translate-y-8'}"
	></span>

	<span
		class="icon-[fluent--weather-moon-24-filled] block text-2xl mt-2 transform transition-transform duration-300 {!isDark &&
			'-translate-y-8'}"
	></span>
</button>
