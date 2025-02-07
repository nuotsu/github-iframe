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
	display: Display
	lineNums?: boolean
	highlight?: string
	scrollTo?: boolean

	setRepo: (repo: string) => void
	setPath: (path: string) => void
	setTheme: (theme: Theme) => void
	setLang: (lang?: string) => void
	setDisplay: (display: Display) => void
	setLineNums: (lineNums?: boolean) => void
	setHighlight: (highlight?: string) => void
	setScrollTo: (scrollTo?: boolean) => void
}>((set) => ({
	repo: 'nuotsu/github-iframe',
	path: 'src/lib/store.ts',
	theme: DEFAULT_THEME,
	lang: undefined,
	display: DISPLAYS[0],
	lineNums: false,
	highlight: undefined,
	scrollTo: false,

	setRepo: (repo: string) => set({ repo }),
	setPath: (path: string) => set({ path }),
	setTheme: (theme: Theme) => set({ theme }),
	setLang: (lang?: string) => set({ lang }),
	setDisplay: (display: Display) => set({ display }),
	setLineNums: (lineNums?: boolean) => set({ lineNums }),
	setHighlight: (highlight?: string) => set({ highlight }),
	setScrollTo: (scrollTo?: boolean) => set({ scrollTo }),
}))

export function getSrc() {
	return store(
		({ repo, path, theme, lang, display, lineNums, highlight, scrollTo }) => {
			const domain = dev ? 'http://localhost:3000' : DOMAIN
			const url = new URL(
				`${domain}/${repo}/${path}${highlight ? `#L${highlight}` : ''}`,
			)

			if (theme !== DEFAULT_THEME) url.searchParams.set('theme', theme)
			if (lang) url.searchParams.set('lang', lang)
			if (display !== 'none') url.searchParams.set('display', display)
			if (lineNums) url.searchParams.set('lineNums', '0')
			if (highlight && scrollTo) url.searchParams.set('scrollTo', '1')

			return url.toString()
		},
	)
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
