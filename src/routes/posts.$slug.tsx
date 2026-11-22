import { createFileRoute, notFound } from '@tanstack/react-router'
import { MDXContent } from '@content-collections/mdx/react'
import { allPosts } from '~/features/contents/lib/content'

export const Route = createFileRoute('/posts/$slug')({
	loader: ({ params }) => {
		const post = allPosts.find((post) => post._meta.path === params.slug)
		if (!post) {
			throw notFound()
		}
		return post
	},
	head: ({ loaderData }) => ({
		meta: loaderData?.placeholder ? [{ name: 'robots', content: 'noindex, nofollow' }] : []
	}),
	component: Post
})

function Post() {
	const post = Route.useLoaderData()

	return (
		<main className="container">
			<article className="mx-auto prose dark:prose-invert">
				<h1 className="text-center mb-0">{post.title}</h1>
				<p className="text-center tetx-sm mt-2 mb-10">{post.description}</p>

				<MDXContent code={post?.mdx as string} />

				<span>~~~ エンデ</span>
				<time className="text-zinc-500 dark:text-zinc-400 block mt-10">
					{new Date(post.published).toLocaleDateString('en-GB', {
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					})}
				</time>
				<div className="space-x-2 text-blue-500 dark:text-blue-300">
					{post.tags && post.tags.map((tag) => <span key={tag}>#{tag}</span>)}
				</div>
			</article>
		</main>
	)
}
