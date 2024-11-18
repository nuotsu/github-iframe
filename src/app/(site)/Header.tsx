import { VscStarFull } from 'react-icons/vsc'

const version = process.env.npm_package_version

export default function Header() {
	return (
		<header>
			<h1 className="flex flex-wrap items-baseline gap-x-2 font-bold">
				GitHub iframe
				<code className="text-xs font-normal text-neutral-400">v{version}</code>
			</h1>

			<p className="text-sm text-neutral-500">
				Display live GitHub code in an iframe
			</p>

			<p className="mt-2">
				<a className="with-icon" href="https://github.com/nuotsu/github-iframe">
					<VscStarFull /> Star on GitHub
				</a>
			</p>
		</header>
	)
}
