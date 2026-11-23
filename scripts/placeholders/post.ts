import { phrases, yapping } from '../../src/features/contents/lib/maerith'
import type { ContentDocument } from '../../src/features/contents/lib/content-schema'

const pad = (value: number) => String(value).padStart(2, '0')

function buildTags(seed: string, count: number): string[] {
	const tags = [
		...new Set(
			phrases(`${seed}-tag`, count, [1, 1]).map((tag) => tag.replace(/\.$/, '').toLowerCase())
		)
	]

	// De-duplication can drop the list below the minimum, so top it up deterministically.
	for (let extra = 1; tags.length < 2 && extra <= 10; extra++) {
		const [raw] = phrases(`${seed}-tag-extra-${extra}`, 1, [1, 1])
		const tag = raw.replace(/\.$/, '').toLowerCase()
		if (!tags.includes(tag)) tags.push(tag)
	}

	return tags
}

export function createPostPlaceholder(index: number): ContentDocument {
	const seed = `post-placeholder-${pad(index)}`
	const { title, excerpt, body } = yapping(seed, {
		paragraphs: [4, 5],
		sentences: [3, 5]
	})

	return {
		title,
		published: '1970-01-01',
		description: excerpt,
		content: body.join('\n\n'),
		tags: buildTags(seed, 2 + (index % 3)),
		type: 'post'
	}
}
