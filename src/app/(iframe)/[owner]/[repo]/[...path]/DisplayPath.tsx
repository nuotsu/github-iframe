import { cn } from '@/lib/utils'
import type { Display } from '@/lib/store'

export default function DisplayPath({
	owner,
	repo,
	path,
	theme,
	display,
}: {
	owner: string
	repo: string
	path?: string[]
	theme?: string
	display?: Display
}) {
	return (
		<h1
			className={cn(
				'fixed right-3 bottom-0 font-mono text-[10px] *:opacity-40 *:transition-opacity',
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
				<Segment href={`${owner}/${repo}/blob/main/${path?.join('/')}`}>
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
