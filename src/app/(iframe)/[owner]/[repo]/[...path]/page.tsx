import { getRawContent } from '@/lib/octokit'
import Code from './Code'
import { VscGithub } from 'react-icons/vsc'
import ClickToCopy from '@/ui/ClickToCopy'
import DisplayPath from './DisplayPath'
import { cn } from '@/lib/utils'
import type { Display } from '@/lib/store'

export default async function Page({
	params,
	searchParams,
	...rest
}: {
	params: Promise<{
		owner: string
		repo: string
		path?: string[]
	}>
	searchParams: Promise<{
		theme?: string
		display?: Display
		lineNums?: string
	}>
}) {
	const { owner, repo, path } = await params
	const { theme, display, lineNums } = await searchParams

	const raw = await getRawContent({ owner, repo, path })

	return (
		<>
			<Code raw={raw} path={path} options={{ theme, lineNums }} />

			<nav
				className={cn(
					'fixed top-1 right-2 flex text-lg *:p-1 *:opacity-25 [&>:hover]:opacity-100',
					!theme?.includes('light') && 'text-white',
				)}
			>
				<a
					href={`https://github.com/${owner}/${repo}/blob/main/${path?.join('/')}`}
					target="_blank"
					title="View on GitHub"
				>
					<VscGithub />
				</a>

				<ClickToCopy value={raw} />
			</nav>

			{display !== 'none' && (
				<DisplayPath
					owner={owner}
					repo={repo}
					path={path}
					theme={theme}
					display={display}
				/>
			)}
		</>
	)
}
