import { bundledLanguages, codeToHtml } from 'shiki'

export default async function Code({
	raw,
	path,
}: {
	raw: string
	path?: string[]
	lang?: keyof typeof bundledLanguages
}) {
	const ext = path?.at(-1)?.split('.').at(-1) ?? ''

	const code = await codeToHtml(raw, {
		lang: Object.keys(bundledLanguages).includes(ext) ? ext : 'text',
		theme: 'github-dark',
	})

	const lineNumDigits = String(raw.split('\n').length).length ?? 1

	return (
		<article
			className="*:p-1"
			dangerouslySetInnerHTML={{ __html: code }}
			style={
				{ '--line-num-width': `${lineNumDigits}ch` } as React.CSSProperties
			}
		/>
	)
}
