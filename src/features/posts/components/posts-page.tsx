import { Link } from '@tanstack/react-router'
import { posts } from '~/features/contents/lib/content'

const monthYear = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' })

export default function PostsPage() {
	return (
		<main className="container py-8">
			<header>
				<h1 className="text-3xl font-bold md:text-4xl">Yapping</h1>
				<p className="lg:text-lg font-medium text-zinc-400">Posts, Notes, Thoughts</p>
			</header>

			<ul className="mt-8 space-y-4">
				{posts.map((post) => (
					<li key={post._meta.path} className="md:flex gap-4">
            <div className="md:w-28 text-zinc-400 font-mono md:mt-1">
              <span className='md:hidden'>- </span>
							{monthYear.format(new Date(post.published))}
						</div>
						<div>
							<Link
								to="/posts/$slug"
								params={{ slug: post._meta.path }}
								className="text-lg font-semibold"
							>
								{post.title}
							</Link>
							<p className="text-zinc-400">{post.description}</p>
							{post.tags?.length && (
								<div className="flex flex-wrap gap-2">
									{post.tags.map((tag) => (
										<span key={tag} className="text-sky-500 text-sm font-mono dark:text-sky-300">
											#{tag}
										</span>
									))}
								</div>
							)}
						</div>
					</li>
				))}
			</ul>
		</main>
	)
}
