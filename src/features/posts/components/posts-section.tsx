import { Link } from '@tanstack/react-router'
import { getArchiveSummary, posts } from '~/features/contents/lib/content'
import PostsItem from './post-item'

const monthDay = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: "UTC" })

type PostsProps = {
	limit?: number
}

export default function Posts({ limit = 5 }: PostsProps) {
	const { remainingCount, archiveYears } = getArchiveSummary(posts, limit)

	const displayPosts = posts.slice(0, limit).map((post) => ({
		year: Number(post.published.slice(0, 4)),
		title: post.title,
		description: post.description,
		date: monthDay.format(new Date(post.published)),
		readTime: post.readingTime,
		category: post.tags?.[0] ?? 'Post',
		slug: post._meta.path
	}))

	const postsByYear = displayPosts.reduce<Map<number, typeof displayPosts>>((groups, post) => {
		const yearPosts = groups.get(post.year) ?? []
		yearPosts.push(post)
		groups.set(post.year, yearPosts)
		return groups
	}, new Map())

	const years = [...postsByYear.keys()].sort((a, b) => b - a)

	return (
		<>
			<h3 className="text-3xl font-bold md:text-4xl">Yapping</h3>
			<p className="lg:text-lg font-medium text-zinc-400">Posts, Notes, Thoughts</p>

			<div className="mt-6 space-y-4">
				{years.map((year) => (
					<section key={year}>
						<h4 className="text-lg font-semibold">{year}</h4>

						<ol className="relative mt-2 ml-2 border-l border-zinc-300 dark:border-zinc-700">
							{postsByYear.get(year)?.map((post) => (
								<PostsItem
									key={post.slug}
									title={post.title}
									description={post.description}
									date={post.date}
									readTime={post.readTime}
									category={post.category}
									slug={post.slug}
								/>
							))}
						</ol>
					</section>
				))}
				<div className="flex items-center gap-4">
					{remainingCount > 0 && (
						<>
							<span className="shrink-0 text-sm text-zinc-400">+ {remainingCount}</span>
							<span className="text-sm text-zinc-400">|</span>
						</>
					)}

					{archiveYears.length > 0 && (
						<>
							<div className="flex items-center gap-2 text-sm text-zinc-400 max-md:hidden">
								<span>{archiveYears[0]}</span>
								{archiveYears.length >= 3 && <span>...</span>}
								{archiveYears.length >= 2 && <span>{archiveYears.at(-1)}</span>}
							</div>
							<div className="h-px w-full bg-zinc-300 dark:bg-zinc-400" />
						</>
					)}

					<Link to="/posts" className="shrink-0 flex items-center gap-2">
						Read more yap <span className="icon-[carbon--arrow-right]" />
					</Link>
				</div>
			</div>
		</>
	)
}
