import { useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'theme'
const listeners = new Set<() => void>()
let initialized = false

function getSystemTheme(): Theme {
	return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getSnapshot(): Theme {
	try {
		const s = localStorage.getItem(STORAGE_KEY)
		if (s === 'dark' || s === 'light') return s
	} catch {}
	return getSystemTheme()
}

const getServerSnapshot = (): Theme => 'light'

function notify() {
	document.documentElement.setAttribute('data-theme', getSnapshot())
	listeners.forEach((l) => l())
}

function init() {
	if (initialized) return
	initialized = true
	matchMedia('(prefers-color-scheme: dark)').addEventListener('change', notify)
	addEventListener('storage', (e) => {
		if (e.key === STORAGE_KEY || e.key === null) notify()
	})
}

function subscribe(cb: () => void) {
	init()
	listeners.add(cb)
	return () => void listeners.delete(cb)
}

export function useTheme() {
	const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
	const setTheme = (next: Theme) => {
		try {
			localStorage.setItem(STORAGE_KEY, next)
		} catch {}
		notify()
	}
	return { theme, setTheme } as const
}
