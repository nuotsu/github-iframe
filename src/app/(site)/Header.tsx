import { getCachedStargazers } from '@/lib/octokit/utils'
import { VscStarFull } from 'react-icons/vsc'

const version = process.env.npm_package_version
const repo = 'nuotsu/github-iframe'

export default async function Header() {
	const stargazers = await getCachedStargazers(repo)

	return (
		<header>
			<h1 className="flex flex-wrap items-baseline gap-x-2">
				<strong className="text-lg">GitHub iframe</strong>
				<code className="text-xs text-neutral-400">v{version}</code>
			</h1>

			<p className="text-sm text-neutral-500">
				Display live GitHub code in an iframe
			</p>

			<p className="mt-2">
				<a
					className="with-icon group gap-3"
					href={`https://github.com/${repo}`}
				>
					<span className="flex items-center">
						<VscStarFull /> {stargazers}
					</span>

					<span className="group-hover:underline">Star on GitHub</span>
				</a>
			</p>
		</header>
	)
}
