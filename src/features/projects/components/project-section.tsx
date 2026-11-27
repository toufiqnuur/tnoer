import { projects } from '~/data/projects'
import ProjectCard from './project-card'
import { Link } from '@tanstack/react-router'

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

			<div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-8 relative after:content-[''] after:absolute after:w-full after:h-20 after:inset-0 after:bg-linear-to-b after:from-0% after:from-transparent after:to-80% after:to-white dark:after:to-zinc-900">
				<div className="rounded-t-3xl h-16 border-x-3 border-t-3 shadow-sm border-white dark:border-white/10 relative before:content-[''] before:w-full before:h-full before:top-0 before:left-0 before:absolute before:rounded-t-3xl before:bg-blue-50 dark:before:bg-zinc-900" />
				<div className="rounded-t-3xl h-16 border-x-3 border-t-3 shadow-sm border-white dark:border-white/10 relative before:content-[''] before:w-full before:h-full before:top-0 before:left-0 before:absolute before:rounded-t-3xl before:bg-blue-50 dark:before:bg-zinc-900 max-md:hidden" />
			</div>

			<Link
				to="/projects"
				className="rounded-xl border-r border-b border-blue-200 bg-linear-to-tl from-blue-50 to-white px-4 py-2 font-medium text-blue-500 shadow-md dark:border-zinc-700 dark:from-zinc-900 dark:to-zinc-800 dark:text-blue-400 mx-auto w-fit flex items-center gap-2 relative"
			>
				See more toys <span className="icon-[carbon--arrow-right]" />
			</Link>
		</div>
	)
}
