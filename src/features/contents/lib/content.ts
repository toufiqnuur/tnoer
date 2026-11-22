import { allGeneratedPosts, allPosts as realPosts } from 'content-collections'

export type ContentPost = (typeof realPosts)[number] & {
	placeholder: boolean
	wordCount: number
	readingTime: number
}

const byPublishedDesc = (a: { published: string }, b: { published: string }) =>
	b.published.localeCompare(a.published)

const withReadingTime = <T extends { content: string }>(post: T) => {
	const wordCount = post.content.trim().split(/\s+/).filter(Boolean).length
	return {
		...post,
		wordCount,
		readingTime: Math.max(1, Math.round(wordCount / 200))
	}
}

const real = [...realPosts]
	.sort(byPublishedDesc)
	.map((post) => withReadingTime({ ...post, placeholder: false }))

const generated = [...allGeneratedPosts]
	.sort(byPublishedDesc)
	.map((post) => withReadingTime({ ...post, placeholder: true }))

export const allPosts: ContentPost[] = [...real, ...generated]

export const posts = allPosts.filter((post) => post.type === 'post')

export const teardowns = allPosts.filter((post) => post.type === 'teardown')

export const placeholderSlugs = new Set(generated.map((post) => post._meta.path))

export function getArchiveSummary(posts: ContentPost[], visible: number) {
	const realPosts = posts.filter((post) => !post.placeholder)
	const remaining = realPosts.slice(visible)
	const archiveYears = [
		...new Set(remaining.map((post) => Number(post.published.slice(0, 4))))
	].sort((a, b) => b - a)

	return {
		remainingCount: Math.max(0, realPosts.length - visible),
		archiveYears
	}
}
