import { yapping } from '../../src/features/contents/lib/maerith'
import type { ContentDocument } from '../../src/features/contents/lib/content-schema'

const pad = (value: number) => String(value).padStart(2, '0')

export function createTeardownPlaceholder(index: number): ContentDocument {
	const seed = `teardown-placeholder-${pad(index)}`
	const { title, excerpt, body } = yapping(seed, {
		paragraphs: [4, 5],
		sentences: [3, 5]
	})

	const [intro, ...rest] = body

	return {
		title,
		published: '1970-01-01',
		description: excerpt,
		content: [intro, '## Overview', ...rest].filter(Boolean).join('\n\n'),
		tags: [],
		type: 'teardown'
	}
}
