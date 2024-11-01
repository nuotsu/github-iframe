import { VscStarFull } from 'react-icons/vsc'

export default function Header() {
	return (
		<header>
			<h1 className="font-bold">GitHub iframe</h1>

			<p>
				<a className="with-icon" href="https://github.com/nuotsu/github-iframe">
					<VscStarFull /> Star on GitHub
				</a>
			</p>
		</header>
	)
}
