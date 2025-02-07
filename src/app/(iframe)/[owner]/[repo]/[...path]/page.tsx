import { getRawContent } from '@/lib/octokit/utils'
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
	}>
}) {
	const { owner, repo, path } = await params
	const { theme, lang, display, lineNums, L } = await searchParams

	const raw = await getRawContent({ owner, repo, path })

	return (
		<>
			<ConvertHashToParam params={{ theme, display, lineNums }} />

			<Code raw={raw} path={path} options={{ theme, lang, lineNums, L }} />

			<nav
				className={cn(
					'fixed top-1 right-2 flex text-lg *:p-1 *:opacity-25 *:transition-opacity [&>:hover]:opacity-100',
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

			<BgColor />
		</>
	)
}
