import { Link } from '@tanstack/react-router'
import DarkModeToggle from './dark-mode-toggle'

export default function Header() {
	return (
		<header className="py-4">
			<div className="container flex items-center justify-between">
				<Link to="/">
					<img
						src="/assets/img/easter-icon.png"
						width={128}
						height={80}
						alt="Tnoer"
						loading="eager"
						fetchPriority="high"
						srcSet="/assets/img/easter-icon.png 1x, /assets/img/easter-icon.png 2x"
					/>
				</Link>

				<div className="flex flex-row gap-2 rounded-2xl border border-white/50 bg-white/50 p-2 shadow-md backdrop-blur-2xl dark:border-zinc-800 dark:bg-zinc-900/50">
					<a
						href="https://github.com/toufiqnuur/tnoer"
						target="_blank"
						rel="noreferrer"
						className="rounded-xl border-r border-b border-blue-200 bg-linear-to-tl from-blue-100 to-transparent p-2 text-blue-500 dark:border-zinc-700 dark:from-zinc-900 dark:to-zinc-800 dark:text-blue-400"
						aria-label="View source on GitHub"
					>
						<span className="icon-[formkit--github] block text-2xl" />
					</a>
					<DarkModeToggle />
				</div>
			</div>
		</header>
	)
}
