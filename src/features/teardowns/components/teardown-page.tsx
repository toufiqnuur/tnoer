import { Link } from '@tanstack/react-router'
import { teardowns } from '~/features/contents/lib/content'

const monthYear = new Intl.DateTimeFormat('en-US', {
	month: 'short',
	year: 'numeric',
	timeZone: 'UTC'
})

export default function TeardownsPage() {
	return (
		<main className="container py-8">
			<div>
				<h3 className="text-3xl font-bold md:text-4xl">Waffling</h3>
				<div className="lg:text-lg font-medium text-zinc-400">Teardowns</div>
			</div>

			<ul className="mt-8 space-y-4">
				{teardowns.map((post) => (
					<li key={post._meta.path} className="md:flex gap-4">
						<div className="md:w-28 text-zinc-400 font-mono md:mt-1">
							<span className="md:hidden">- </span>
							{monthYear.format(new Date(post.published))}
						</div>
						<div>
							<Link to="/posts/$slug" params={{ slug: post._meta.path }} className="font-semibold">
								{post.title}
							</Link>
							<p className="text-zinc-400">{post.description}</p>
						</div>
					</li>
				))}
			</ul>
		</main>
	)
}
