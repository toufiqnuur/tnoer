import { createFileRoute } from '@tanstack/react-router'
import Hero from '~/components/hero'
import Contact from '~/components/contact'
import Project from '~/components/project'
import projects from '~/projects.json'

export const Route = createFileRoute('/')({
	component: Index
})

function Index() {
	return (
		<main className="space-y-8 pb-8 md:space-y-12">
			<Hero />
			<div className="container py-8">
				<h3 className="text-3xl font-bold md:text-4xl">Featured Projects</h3>
				<div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-8">
					{projects.map((p: any) => (
						<Project key={p.title} data={p} />
					))}
				</div>
			</div>
			<Contact />
		</main>
	)
}
