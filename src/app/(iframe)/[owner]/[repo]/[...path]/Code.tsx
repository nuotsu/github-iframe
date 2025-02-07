import {
	codeToHtml,
	bundledLanguages,
	bundledThemes,
	splitLines,
	type DecorationItem,
} from 'shiki'
import { DEFAULT_THEME } from '@/lib/store'
import CodeWrapper from './CodeWrapper'
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
		lang?: string
		lineNums?: string
		scrollTo?: string
		L?: string
	}
}) {
	const ext = path?.at(-1)?.split('.').at(-1) ?? ''

	const { theme, lang, scrollTo, L } = options

	const code = await codeToHtml(raw, {
		lang:
			lang && Object.keys(bundledLanguages).includes(lang)
				? lang
				: Object.keys(bundledLanguages).includes(ext)
					? ext
					: 'text',
		theme:
			theme && Object.keys(bundledThemes).includes(theme)
				? theme
				: DEFAULT_THEME,
		decorations: L ? convertLtoDecorations(L, raw) : undefined,
	})

	const lineNumDigits = String(raw.split('\n').length).length ?? 1
	const firstHighlightedLine = L?.split(',')?.[0]?.split('-')?.[0]

	return (
		<CodeWrapper
			scrollTo={!!scrollTo ? firstHighlightedLine : undefined}
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

function convertLtoDecorations(L: string, code: string): DecorationItem[] {
	const lines = L.split(',').flatMap((segment) => {
		if (segment.includes('-')) {
			const range = segment.split('-').map(Number)

			// convert to array of numbers
			return Array.from(
				{ length: range[1] - range[0] + 1 },
				(_, i) => range[0] + i,
			)
		}

		return Number(segment)
	})

	return lines
		?.map((row) => ({
			row,
			characters: splitLines(code)[row - 1]?.[0]?.length,
		}))
		?.filter(({ characters }) => characters > 0)
		?.map(({ row, characters }) => ({
			start: { line: row - 1, character: 0 },
			end: { line: row - 1, character: characters },
			properties: { class: 'highlight', 'data-line': row },
		}))
}
