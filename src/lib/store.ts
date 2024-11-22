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
	highlight: string

	setRepo: (repo: string) => void
	setPath: (path: string) => void
	setTheme: (theme: Theme) => void
	setDisplay: (display: Display) => void
	setLineNums: (lineNums: boolean) => void
	setHighlight: (highlight: string) => void
}>((set) => ({
	repo: 'nuotsu/github-iframe',
	path: 'src/lib/store.ts',
	theme: DEFAULT_THEME,
	display: DISPLAYS[0],
	lineNums: false,
	highlight: '',

	setRepo: (repo: string) => set({ repo }),
	setPath: (path: string) => set({ path }),
	setTheme: (theme: Theme) => set({ theme }),
	setDisplay: (display: Display) => set({ display }),
	setLineNums: (lineNums: boolean) => set({ lineNums }),
	setHighlight: (highlight: string) => set({ highlight }),
}))

export function getSrc() {
	return store(({ repo, path, theme, display, lineNums, highlight }) => {
		const domain = dev ? 'http://localhost:3000' : DOMAIN
		const url = new URL(
			`${domain}/${repo}/${path}${highlight ? `#L${highlight}` : ''}`,
		)

		if (theme !== DEFAULT_THEME) url.searchParams.set('theme', theme)
		if (display !== 'none') url.searchParams.set('display', display)
		if (lineNums) url.searchParams.set('lineNums', '0')

		return url.toString()
	})
}
