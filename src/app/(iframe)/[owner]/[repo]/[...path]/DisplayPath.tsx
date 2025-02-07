import setHighlights from '@/lib/octokit/setHighlights'
import { cn } from '@/lib/utils'
import type { Display } from '@/lib/store'

export default function DisplayPath({
	owner,
	repo,
	path,
	options,
}: {
	owner: string
	repo: string
	path?: string[]
	options: {
		theme?: string
		display?: Display
		L?: string
	}
}) {
	const { theme, display, L } = options

	const highlights = setHighlights(L)

	return (
		<h1
			className={cn(
				'fixed right-0 bottom-0 z-1 rounded-tl px-2 font-mono text-[10px] backdrop-blur *:opacity-40 *:transition-opacity',
				!theme?.includes('light') && 'text-white',
			)}
		>
			{(display === 'repo' || display === 'all') && (
				<Segment href={`${owner}/${repo}`}>
					{owner}/{repo}
				</Segment>
			)}

			{display === 'all' && <span>/</span>}

			{(display === 'path' || display === 'all') && (
				<Segment
					href={`${owner}/${repo}/blob/main/${path?.join('/')}${highlights}`}
				>
					{path?.join('/')}
				</Segment>
			)}
		</h1>
	)
}

function Segment({ href, ...props }: React.ComponentProps<'a'>) {
	return (
		<a
			href={`https://github.com/${href}`}
			className="inline-block py-1 hover:opacity-100"
			target="_blank"
			{...props}
		/>
	)
}
