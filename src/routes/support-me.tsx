import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/support-me')({
	component: SupportMe
})

function SupportMe() {
	return (
		<main>
			<div className="container mt-4">
				<div className="rounded-4xl border border-white/50 bg-white/10 px-4 py-6 shadow backdrop-blur-2xl md:p-8 dark:border-white/10 dark:bg-white/5">
					<div className="flex gap-2">
						<span className="block h-4 w-4 rounded-full border border-zinc-200 bg-zinc-50 shadow-xs dark:border-zinc-700 dark:bg-zinc-800" />
						<span className="block h-4 w-4 rounded-full border border-zinc-200 bg-zinc-50 shadow-xs dark:border-zinc-700 dark:bg-zinc-800" />
						<span className="block h-4 w-4 rounded-full border border-zinc-200 bg-zinc-50 shadow-xs dark:border-zinc-700 dark:bg-zinc-800" />
					</div>
					<h1 className="mt-4 text-3xl font-bold">Support Me</h1>

					<p className="mt-4 font-medium text-zinc-600 dark:text-zinc-300">
						I'm passionate about building high-quality projects from the ground up, optimizing
						performance, and promoting quality-focused practices in development.
					</p>
					<p className="mt-3 mb-5 font-medium text-zinc-600 dark:text-zinc-300">
						If you've found value in my articles, open-source projects, or technical guides, please
						consider supporting me. Your contribution helps me dedicate more time to creating
						high-quality resources and tools for the web community.
					</p>
					<a href="https://trakteer.id/toufiqnuurr" target="_blank" rel="noreferrer">
						<img
							id="wse-buttons-preview"
							src="https://edge-cdn.trakteer.id/images/embed/trbtn-blue-1.png?v=14-05-2025"
							height={40}
							style={{ border: '0px', height: '40px' }}
							alt="Trakteer Saya"
						/>
					</a>
				</div>
			</div>
		</main>
	)
}
