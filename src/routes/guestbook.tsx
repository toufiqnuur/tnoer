import { createFileRoute } from '@tanstack/react-router'
import Giscus from '@giscus/react'
import { useTheme } from '~/hooks/use-theme'

export const Route = createFileRoute('/guestbook')({
	component: Guestbook
})

function Guestbook() {
	const { theme } = useTheme()

	return (
		<main className="min-h-screen">
			<div className="container py-8">
				<h1 className="text-3xl font-bold">Guest Book</h1>
				<p className="mt-1.5 font-medium text-zinc-600 dark:text-zinc-300">
					We'd love to hear from you. Leave your mark below.
				</p>
				<div className="mt-12">
					<Giscus
						repo="toufiqnuur/tnoer"
						repoId="R_kgDOKTn2SA"
						category="Show and tell"
						categoryId="DIC_kwDOKTn2SM4Cxj_j"
						mapping="pathname"
						strict="0"
						reactionsEnabled="0"
						emitMetadata="0"
						inputPosition="top"
						// theme={isDark ? "dark" : "light"}
						theme={theme}
						lang="en"
						loading="lazy"
					/>
				</div>
			</div>
		</main>
	)
}
