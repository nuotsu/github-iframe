import { bundledThemes } from 'shiki'
import { create } from 'zustand'
import { dev } from '@/lib/env'

export const DOMAIN = 'https://github-iframe.vercel.app'

export const DISPLAYS = ['none', 'repo', 'path', 'all'] as const
export const DEFAULT_THEME: Theme = 'github-dark-default'

export type Display = (typeof DISPLAYS)[number]
export type Theme = keyof typeof bundledThemes

export const store = create<{
	repo: string
	path: string
	theme: Theme
	display: Display
	lineNums: boolean

	setRepo: (repo: string) => void
	setPath: (path: string) => void
	setTheme: (theme: Theme) => void
	setDisplay: (display: Display) => void
	setLineNums: (lineNums: boolean) => void
}>((set) => ({
	repo: 'nuotsu/github-iframe',
	path: 'src/lib/store.ts',
	theme: DEFAULT_THEME,
	display: DISPLAYS[0],
	lineNums: false,

	setRepo: (repo: string) => set({ repo }),
	setPath: (path: string) => set({ path }),
	setTheme: (theme: Theme) => set({ theme }),
	setDisplay: (display: Display) => set({ display }),
	setLineNums: (lineNums: boolean) => set({ lineNums }),
}))

export function getSrc() {
	const src = store(({ repo, path, theme, display, lineNums }) => {
		const url = new URL(
			`${dev ? 'http://localhost:3000' : DOMAIN}/${repo}/${path}`,
		)

		if (theme !== DEFAULT_THEME) url.searchParams.set('theme', theme)
		if (display !== 'none') url.searchParams.set('display', display)
		if (lineNums) url.searchParams.set('lineNums', '0')

		return url.toString()
	})

	return src
}
