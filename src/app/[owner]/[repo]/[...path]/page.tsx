import { Octokit } from 'octokit'
import { notFound } from 'next/navigation'
import Code from '@/ui/Code'
import ClickToCopy from '@/ui/ClickToCopy'
import { VscGithub } from 'react-icons/vsc'

const octokit = new Octokit({
	auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN!,
})

export default async function Page({
	params,
}: {
	params: Promise<{
		owner: string
		repo: string
		path?: string[]
	}>
}) {
	const { owner, repo, path } = await params

	const { data } = await octokit.rest.repos
		.getContent({
			owner,
			repo,
			path: path?.join('/') ?? '',
			mediaType: {
				format: 'raw',
			},
		})
		// TODO: handle errors
		.catch(notFound)

	const raw = String(data)

	return (
		<>
			<Code raw={raw} path={path} />

			<nav className="fixed right-2 top-1 flex text-xl text-white *:p-1 *:opacity-25 [&>:hover]:opacity-100">
				<a
					href={`https://github.com/${owner}/${repo}/blob/main/${path?.join('/')}`}
					target="_blank"
					title="View on GitHub"
				>
					<VscGithub />
				</a>

				<ClickToCopy value={raw} />
			</nav>
		</>
	)
}
