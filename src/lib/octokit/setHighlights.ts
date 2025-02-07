export default function setHighlights(highlight?: string) {
	if (!highlight) return ''

	const highlights = highlight.split(',')?.[0]?.split('-')

	return '#' + highlights.map((line) => `L${line}`).join('-')
}
