import { Link } from '@tanstack/react-router'

type PostsItemProps = {
	title: string
	description?: string
	date: string
	readTime: number
	category: string
	slug: string
}

export default function PostsItem({
	title,
	description,
	date,
	readTime,
	category,
	slug
}: PostsItemProps) {
	return (
		<li className="relative py-4 pl-8">
			<span className="absolute top-6 -left-1.25 h-2.5 w-2.5 rounded-full bg-zinc-500 dark:bg-zinc-400" />
			<span className="absolute top-7.25 left-2.5 h-px w-3 bg-zinc-400 dark:bg-zinc-600" />

			<Link to="/posts/$slug" params={{ slug }} className="text-lg font-semibold">
				<h5>{title}</h5>
			</Link>

			{description && (
				<p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">{description}</p>
			)}

			<div className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
				{date} · {readTime} min read · {category}
			</div>
		</li>
	)
}
