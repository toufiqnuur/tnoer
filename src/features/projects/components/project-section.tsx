import { projects } from '~/data/projects'
import ProjectCard from './project-card'

type ProjectSectionProps = {
	limit?: number
}

export default function Projects({ limit = 2 }: ProjectSectionProps) {
	const recent = [...projects].sort((a, b) => Number(b.year) - Number(a.year)).slice(0, limit)

	return (
		<div className="container py-8">
			<h3 className="text-3xl font-bold md:text-4xl relative">
				<span className="text-zinc-400 dark:text-zinc-600">Toy</span> Projects
			</h3>
			<p className="lg:text-lg font-medium text-zinc-400">Things I've built for fun.</p>

			<div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-8">
				{recent.map((project) => (
					<ProjectCard key={project.title} project={project} />
				))}
			</div>
		</div>
	)
}
