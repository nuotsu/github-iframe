import { bundledThemes } from 'shiki'
import { create } from 'zustand'
import { dev } from '@/lib/env'

export const DOMAIN = 'https://github-iframe.vercel.app'

export const DISPLAYS = ['none', 'repo', 'path', 'all'] as const
export const DEFAULT_THEME: Theme = 'dark-plus'

export type Display = (typeof DISPLAYS)[number]
export type Theme = keyof typeof bundledThemes

export const store = create<{
	repo: string
	path: string
	theme: Theme
	lang?: string
	lineNums: boolean
	highlight: string
	display: Display

	setRepo: (repo: string) => void
	setPath: (path: string) => void
	setTheme: (theme: Theme) => void
	setLang: (lang: string) => void
	setLineNums: (lineNums: boolean) => void
	setHighlight: (highlight: string) => void
	setDisplay: (display: Display) => void
}>((set) => ({
	repo: 'nuotsu/github-iframe',
	path: 'src/lib/store.ts',
	theme: DEFAULT_THEME,
	lang: undefined,
	lineNums: false,
	highlight: '',
	display: DISPLAYS[0],

	setRepo: (repo: string) => set({ repo }),
	setPath: (path: string) => set({ path }),
	setTheme: (theme: Theme) => set({ theme }),
	setLang: (lang: string) => set({ lang }),
	setLineNums: (lineNums: boolean) => set({ lineNums }),
	setHighlight: (highlight: string) => set({ highlight }),
	setDisplay: (display: Display) => set({ display }),
}))

export function getSrc() {
	return store(({ repo, path, theme, lang, display, lineNums, highlight }) => {
		const domain = dev ? 'http://localhost:3000' : DOMAIN
		const url = new URL(
			`${domain}/${repo}/${path}${highlight ? `#L${highlight}` : ''}`,
		)

		if (theme !== DEFAULT_THEME) url.searchParams.set('theme', theme)
		if (lang) url.searchParams.set('lang', lang)
		if (display !== 'none') url.searchParams.set('display', display)
		if (lineNums) url.searchParams.set('lineNums', '0')

		return url.toString()
	})
}

export function getCode() {
	const { repo, path } = store()
	const src = getSrc()

	return [
		`<iframe`,
		`\tsrc="${src}"`,
		`\twidth="100%" height="400px"`,
		`\ttitle="${repo}/${path}"`,
		`></iframe>`,
	].join('\n')
}
