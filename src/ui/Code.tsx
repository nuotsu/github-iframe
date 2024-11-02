import { codeToHtml, bundledLanguages, bundledThemes } from 'shiki'
import { DEFAULT_THEME } from '@/lib/store'
import { cn } from '@/lib/utils'

export default async function Code({
	raw,
	path,
	options,
}: {
	raw: string
	path?: string[]
	options: {
		theme?: string
		lineNums?: string
	}
}) {
	const ext = path?.at(-1)?.split('.').at(-1) ?? ''

	const { theme } = options

	const code = await codeToHtml(raw, {
		lang: Object.keys(bundledLanguages).includes(ext) ? ext : 'text',
		theme:
			theme && Object.keys(bundledThemes).includes(theme)
				? theme
				: DEFAULT_THEME,
	})

	const lineNumDigits = String(raw.split('\n').length).length ?? 1

	return (
		<article
			className={cn(
				'*:px-2 *:py-1',
				['0', 'false'].includes(options?.lineNums ?? '') && 'hide-line-nums',
			)}
			dangerouslySetInnerHTML={{ __html: code }}
			style={
				{ '--line-num-width': `${lineNumDigits}ch` } as React.CSSProperties
			}
		/>
	)
}
