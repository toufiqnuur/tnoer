import { useTheme } from '~/hooks/use-theme'

export default function DarkModeToggle() {
	const { theme, setTheme } = useTheme()

	return (
		<button
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className="rounded-xl border-r border-b h-10 overflow-hidden border-blue-500 bg-linear-to-tl from-blue-500/90 to-blue-400/90 p-2 text-sm font-semibold text-white shadow-md backdrop-blur-2xl dark:from-blue-600/90 dark:to-blue-500/90"
			aria-label="Toggle dark mode"
		>
			<span
				className={`icon-[fluent--weather-sunny-24-filled] block text-2xl transform transition-transform duration-300 ${!theme && '-translate-y-8'}`}
			/>

			<span
				className={`icon-[fluent--weather-moon-24-filled] block text-2xl mt-2 transform transition-transform duration-300 ${!theme && '-translate-y-8'}`}
			/>
		</button>
	)
}
