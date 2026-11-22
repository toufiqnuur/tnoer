import { z } from 'zod'

export const CONTENT_REQUIREMENTS = {
	post: 5,
	teardown: 5
} as const

export const CONTENT_TYPES = ['post', 'teardown'] as const

export type ContentType = (typeof CONTENT_TYPES)[number]

export const contentSchema = z.object({
	title: z.string(),
	published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
	description: z.string(),
	content: z.string(),
	tags: z.array(z.string()).optional(),
	type: z.enum(['post', 'teardown'])
})

export type ContentDocument = z.infer<typeof contentSchema>
