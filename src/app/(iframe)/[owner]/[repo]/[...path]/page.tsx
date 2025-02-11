import { getRawContent } from '@/lib/octokit/utils'
import setHighlights from '@/lib/octokit/setHighlights'
import ConvertHashToParam from './ConvertHashToParam'
import Code from './Code'
import { VscGithub } from 'react-icons/vsc'
import ClickToCopy from '@/ui/ClickToCopy'
import DisplayPath from './DisplayPath'
import BgColor from './BgColor'
import { cn } from '@/lib/utils'
import type { Display } from '@/lib/store'

export default async function Page({
	params,
	searchParams,
}: {
	params: Promise<{
		owner: string
		repo: string
		path?: string[]
	}>
	searchParams: Promise<{
		theme?: string
		lang?: string
		display?: Display
		lineNums?: string
		L?: string
		scrollTo?: string
	}>
}) {
	const { owner, repo, path } = await params
	const { theme, lang, display, lineNums, L, scrollTo } = await searchParams

	const raw = await getRawContent({ owner, repo, path })

	return (
		<>
			<ConvertHashToParam
				params={{ theme, lang, display, lineNums, scrollTo }}
			/>

			<Code
				raw={raw}
				path={path}
				options={{ theme, lang, lineNums, L, scrollTo }}
			/>

			<nav
				className={cn(
					'fixed top-0 right-0 z-1 flex rounded-bl p-1 text-lg backdrop-blur *:p-1 *:opacity-25 *:transition-opacity [&>:hover]:opacity-100',
					!theme?.includes('light') && 'text-white',
				)}
			>
				<a
					href={`https://github.com/${owner}/${repo}/blob/main/${path?.join('/')}${setHighlights(L)}`}
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
					options={{ theme, display, L }}
				/>
			)}

			<BgColor />
		</>
	)
}
