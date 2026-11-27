import { projects } from '~/data/projects'
import ProjectCard from './project-card'

export default function ProjectPage() {
	const sorted = [...projects].sort((a, b) => Number(b.year) - Number(a.year))

	return (
		<main className="container py-8">
			<header>
				<h1 className="text-3xl font-bold md:text-4xl">
					<span className="text-zinc-400 dark:text-zinc-600">Toy</span> Projects
				</h1>
				<p className="lg:text-lg font-medium text-zinc-400">Things I've built for fun.</p>
			</header>

			<div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
				{sorted.map((project) => (
					<ProjectCard key={project.title} project={project} />
				))}
			</div>
		</main>
	)
}
