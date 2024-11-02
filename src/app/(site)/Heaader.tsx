import { VscStarFull } from 'react-icons/vsc'

const version = process.env.npm_package_version

export default function Header() {
	return (
		<header>
			<h1 className="flex flex-wrap items-baseline gap-x-2 font-bold">
				GitHub iframe
				<code className="text-xs font-normal text-gray-400">v{version}</code>
			</h1>

			<p>
				<a className="with-icon" href="https://github.com/nuotsu/github-iframe">
					<VscStarFull /> Star on GitHub
				</a>
			</p>
		</header>
	)
}
