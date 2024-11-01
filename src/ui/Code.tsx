import { codeToHtml, bundledLanguages, bundledThemes } from 'shiki'
import { DEFAULT_THEME } from '@/lib/store'

export default async function Code({
	raw,
	path,
	theme,
}: {
	raw: string
	path?: string[]
	theme?: string
}) {
	const ext = path?.at(-1)?.split('.').at(-1) ?? ''

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
			className="*:px-2 *:py-1"
			dangerouslySetInnerHTML={{ __html: code }}
			style={
				{ '--line-num-width': `${lineNumDigits}ch` } as React.CSSProperties
			}
		/>
	)
}
