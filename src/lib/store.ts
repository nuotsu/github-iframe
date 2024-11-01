import { bundledThemes } from 'shiki'
import { create } from 'zustand'
import dev from '@/lib/env'

export type Theme = keyof typeof bundledThemes

export const DEFAULT_THEME: Theme = 'github-dark-default'

export const store = create<{
	repo: string
	path: string
	theme: Theme

	setRepo: (repo: string) => void
	setPath: (path: string) => void
	setTheme: (theme: Theme) => void
}>((set) => ({
	repo: 'nuotsu/github-iframe',
	path: 'src/lib/store.ts',
	theme: DEFAULT_THEME,

	setRepo: (repo: string) => set({ repo }),
	setPath: (path: string) => set({ path }),
	setTheme: (theme: Theme) => set({ theme }),
}))

export function getSrc() {
	const src = store(({ repo, path, theme }) => {
		return [
			dev ? '/' : 'https://github-iframe.vercel.app/',
			`${repo}/${path}`,
			theme !== DEFAULT_THEME && `?theme=${theme}`,
		]
			.filter(Boolean)
			.join('')
	})

	return src
}
