/**
 * Maerith: a constructed fantasy language used as deterministic placeholder text.
 * The same seed always produces the same output.
 *
 * Grammar summary
 * - Word order: Subject Verb Object, adjectives follow the noun.
 * - Noun suffixes: -ei plural, -eth abstract, -il diminutive,
 *   -ael locative, -ys genitive (placed on the possessor).
 * - Adjective: root + -ar.
 * - Verb: root + -an present, -ero past, -ume future, -ak imperative.
 * - Sandhi: a root's final vowel drops before a vowel-initial suffix.
 */

type Tense = 'present' | 'past' | 'future' | 'imperative'
export type Range = number | [number, number]

interface Rng {
	next: () => number
	pick: <T>(items: readonly T[]) => T
	chance: (p: number) => boolean
	range: (min: number, max: number) => number
}

export interface Yapping {
	title: string
	excerpt: string
	body: string[]
}

export interface WafflingSection {
	heading: string
	paragraphs: string[]
}

export interface Waffling {
	title: string
	excerpt: string
	sections: WafflingSection[]
}

export interface YappingOptions {
	paragraphs?: Range
	sentences?: Range
}

export interface WafflingOptions {
	sections?: Range
}

function hash(str: string): number {
	let h = 1779033703 ^ str.length
	for (let i = 0; i < str.length; i++) {
		h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
		h = (h << 13) | (h >>> 19)
	}
	h = Math.imul(h ^ (h >>> 16), 2246822507)
	h = Math.imul(h ^ (h >>> 13), 3266489909)
	return (h ^ (h >>> 16)) >>> 0
}

function mulberry32(seed: number): () => number {
	let a = seed
	return () => {
		a = (a + 0x6d2b79f5) | 0
		let t = Math.imul(a ^ (a >>> 15), 1 | a)
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296
	}
}

function rng(seed: string): Rng {
	const next = mulberry32(hash(seed))
	return {
		next,
		pick: (items) => items[Math.floor(next() * items.length)],
		chance: (p) => next() < p,
		range: (min, max) => min + Math.floor(next() * (max - min + 1))
	}
}

const toRange = (value: Range): [number, number] => (Array.isArray(value) ? value : [value, value])

export const LEX = {
	noun: {
		vael: 'light',
		maer: 'shadow',
		arkan: 'magic',
		thyr: 'star',
		lunor: 'moon',
		sorin: 'river',
		kael: 'stone',
		ner: 'night',
		ilun: 'fire',
		eryn: 'forest',
		drav: 'dragon',
		selu: 'wind',
		orim: 'tower',
		vess: 'mist',
		thal: 'name',
		lyth: 'song',
		aun: 'soul',
		korr: 'gate',
		miren: 'memory',
		sael: 'sea'
	},
	adj: {
		dum: 'old',
		zyn: 'silent',
		orth: 'dark',
		fey: 'gentle',
		velk: 'deep',
		ruan: 'ancient',
		tir: 'broken',
		sur: 'grand',
		nol: 'hollow',
		ael: 'pure'
	},
	verb: {
		ven: 'see',
		kar: 'call',
		thul: 'keep',
		ysen: 'weave',
		mor: 'fade',
		sil: 'sing',
		ranth: 'pierce',
		eld: 'wait',
		lorn: 'remember',
		kesh: 'burn'
	},
	particle: {
		syl: 'and',
		mi: 'not',
		ve: 'if',
		sa: 'this',
		tor: 'that',
		oa: 'O',
		kae: 'when',
		nym: 'because'
	}
} as const

const NOUNS = Object.keys(LEX.noun)
const ADJS = Object.keys(LEX.adj)
const VERBS = Object.keys(LEX.verb)

const SUF = {
	plural: 'ei',
	abstract: 'eth',
	diminutive: 'il',
	locative: 'ael',
	genitive: 'ys',
	adjective: 'ar',
	present: 'an',
	past: 'ero',
	future: 'ume',
	imperative: 'ak'
} as const

const endsWithVowel = /[aeiouy]$/
const startsWithVowel = /^[aeiouy]/

const attach = (stem: string, suffix: string): string =>
	(endsWithVowel.test(stem) && startsWithVowel.test(suffix) ? stem.slice(0, -1) : stem) + suffix

const capitalize = (word: string): string => word.charAt(0).toUpperCase() + word.slice(1)

function nounPhrase(r: Rng, { locative = false, simple = false } = {}): string {
	let head = r.pick(NOUNS)
	const roll = r.next()

	if (!simple) {
		if (roll < 0.12) head = attach(head, SUF.abstract)
		else if (roll < 0.22) head = attach(head, SUF.diminutive)
		else if (roll < 0.42) head = attach(head, SUF.plural)
	}
	if (locative) head = attach(head, SUF.locative)

	const words = [head]
	if (r.chance(0.5)) words.push(attach(r.pick(ADJS), SUF.adjective))
	if (!simple && r.chance(0.3)) words.push(attach(r.pick(NOUNS), SUF.genitive))
	return words.join(' ')
}

function verb(r: Rng, tense?: Tense): string {
	const t = tense ?? r.pick<Tense>(['present', 'present', 'past', 'future'])
	return attach(r.pick(VERBS), SUF[t])
}

const PATTERNS: ReadonlyArray<(r: Rng) => string> = [
	(r) => `${nounPhrase(r)} ${verb(r)} ${nounPhrase(r)}`,
	(r) => `${nounPhrase(r)} ${verb(r)} ${nounPhrase(r)}`,
	(r) => `kae ${nounPhrase(r)} ${verb(r)}, ${nounPhrase(r)} ${verb(r)} ${nounPhrase(r)}`,
	(r) => `${nounPhrase(r)} mi ${verb(r)} ${nounPhrase(r)}`,
	(r) => `oa ${nounPhrase(r, { simple: true })}, ${verb(r, 'imperative')} ${nounPhrase(r)}`,
	(r) => `${nounPhrase(r, { locative: true })} ${nounPhrase(r)} ${verb(r)}`,
	(r) => `${nounPhrase(r)} syl ${nounPhrase(r)} ${verb(r, 'past')} ${nounPhrase(r)}`,
	(r) => `ve ${nounPhrase(r)} ${verb(r)}, ${nounPhrase(r)} mi ${verb(r)}`,
	(r) => `${nounPhrase(r)} ${verb(r)} nym ${nounPhrase(r)} ${verb(r, 'past')}`
]

function sentenceWith(r: Rng): string {
	return capitalize(r.pick(PATTERNS)(r)) + '.'
}

function paragraphWith(r: Rng, min: number, max: number): string {
	return Array.from({ length: r.range(min, max) }, () => sentenceWith(r)).join(' ')
}

function titleWith(r: Rng, [min, max]: [number, number] = [2, 3]): string {
	const count = r.range(min, max)
	const parts = [capitalize(nounPhrase(r, { simple: true }).split(' ')[0])]
	while (parts.length < count) {
		const word = r.chance(0.5)
			? attach(r.pick(ADJS), SUF.adjective)
			: attach(r.pick(NOUNS), r.chance(0.5) ? SUF.genitive : SUF.abstract)
		parts.push(capitalize(word))
	}
	return parts.join(' ')
}

export function sentence(seed: string): string {
	return sentenceWith(rng(seed))
}

/** A single phrase with a random word count within [min, max]. */
export function phrase(seed: string, [min, max]: [number, number] = [5, 9]): string {
	const r = rng(`phr:${seed}`)
	const target = r.range(min, max)
	let words: string[] = []
	while (words.length < target) {
		words = words.concat(sentenceWith(r).replace(/[.,]/g, '').toLowerCase().split(' '))
	}
	return capitalize(words.slice(0, target).join(' ')) + '.'
}

export const phrases = (
	prefix: string,
	count: number,
	range: [number, number] = [5, 9]
): string[] => Array.from({ length: count }, (_, i) => phrase(`${prefix}-${i + 1}`, range))

/** Short post: title, excerpt and a few paragraphs. */
export function yapping(
	seed: string,
	{ paragraphs = [2, 4], sentences = [2, 4] }: YappingOptions = {}
): Yapping {
	const r = rng(`yap:${seed}`)
	const [pMin, pMax] = toRange(paragraphs)
	const [sMin, sMax] = toRange(sentences)
	const body = Array.from({ length: r.range(pMin, pMax) }, () => paragraphWith(r, sMin, sMax))
	return { title: titleWith(r), excerpt: sentenceWith(r), body }
}

/** Long post: title, excerpt and several headed sections. */
export function waffling(seed: string, { sections = [3, 5] }: WafflingOptions = {}): Waffling {
	const r = rng(`waf:${seed}`)
	const [min, max] = toRange(sections)
	const count = r.range(min, max)
	return {
		title: titleWith(r, [3, 4]),
		excerpt: `${sentenceWith(r)} ${sentenceWith(r)}`,
		sections: Array.from({ length: count }, () => ({
			heading: titleWith(r, [2, 3]),
			paragraphs: Array.from({ length: r.range(2, 3) }, () => paragraphWith(r, 3, 5))
		}))
	}
}

export const yapList = (prefix: string, count: number): Array<Yapping & { id: string }> =>
	Array.from({ length: count }, (_, i) => ({
		id: `${prefix}-${i + 1}`,
		...yapping(`${prefix}-${i + 1}`)
	}))

export const waffList = (prefix: string, count: number): Array<Waffling & { id: string }> =>
	Array.from({ length: count }, (_, i) => ({
		id: `${prefix}-${i + 1}`,
		...waffling(`${prefix}-${i + 1}`)
	}))
