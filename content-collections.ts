import {
	defineCollection,
	defineConfig,
	type CollectionContext,
	type Document
} from '@content-collections/core'
import { compileMDX } from '@content-collections/mdx'
import { contentSchema } from '~/features/contents/lib/content-schema'

type MdxDocument = Document & { content: string }

const compileDocument = async <T extends MdxDocument>(
	document: T,
	context: Pick<CollectionContext<T>, 'cache'>
) => {
	const mdx = await compileMDX(context, document)
	return {
		...document,
		mdx
	}
}

const posts = defineCollection({
	name: 'posts',
	directory: './src/contents/posts',
	include: '*.mdx',
	schema: contentSchema,
	transform: compileDocument
})

const generatedPosts = defineCollection({
	name: 'generatedPosts',
	directory: './.contents-generated/posts',
	include: '*.json',
	parser: 'json',
	schema: contentSchema,
	transform: compileDocument
})

export default defineConfig({
	collections: [posts, generatedPosts]
})
