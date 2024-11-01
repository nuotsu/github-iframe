'use client'

import { store, getSrc, type Theme } from '@/lib/store'
import Input from '@/ui/Input'
import ClickToCopy from '@/ui/ClickToCopy'
import Link from 'next/link'
import { bundledThemes } from 'shiki'
import {
	VscEye,
	VscFileCode,
	VscGithub,
	VscRepo,
	VscStarFull,
	VscSymbolColor,
} from 'react-icons/vsc'
import { cn } from '@/lib/utils'

export default function Home() {
	const { repo, path, theme, setRepo, setPath, setTheme } = store()
	const src = getSrc()

	const code = [
		`<iframe`,
		`\tsrc="${src}"`,
		`\twidth="100%" height="400px"`,
		`></iframe>`,
	].join('\n')

	const isValid = repo && path

	return (
		<section className="mx-auto max-w-screen-sm space-y-6 p-4">
			<header>
				<h1 className="font-bold">GitHub iframe</h1>

				<p>
					<a
						className="with-icon"
						href="https://github.com/nuotsu/github-iframe"
					>
						<VscStarFull /> Star on GitHub
					</a>
				</p>
			</header>

			<fieldset>
				<legend>Options</legend>

				<div className="grid gap-x-4 gap-y-2 md:grid-cols-2">
					<Input
						title="owner/repo"
						icon={VscRepo}
						defaultValue={repo}
						onChange={(e) => setRepo(e.target.value)}
						pattern=".+/.+"
					/>

					<Input
						title="path/to/file"
						icon={VscFileCode}
						defaultValue={path}
						onChange={(e) => setPath(e.target.value)}
					/>

					<Input icon={VscSymbolColor}>
						<select
							title="Theme"
							className="input w-full"
							defaultValue={theme}
							onChange={(e) => setTheme(e.target.value as Theme)}
						>
							<option disabled>Select a theme</option>
							{Object.entries(bundledThemes).map(([theme]) => (
								<option key={theme}>{theme}</option>
							))}
						</select>
					</Input>
				</div>
			</fieldset>

			<article className="group">
				<pre className="overflow-x-auto border group-has-[button:hover]:border-black/30">
					<code className={cn('block p-2', !isValid && 'opacity-50')}>
						{isValid ? code : 'bruh...'}
					</code>
				</pre>

				<div className="mt-1 flex flex-wrap justify-end gap-x-4 max-md:flex-col">
					<a
						className="with-icon"
						href={`https://github.com/${repo}/blob/main/${path}`}
						target="_blank"
					>
						<VscGithub />
						View Source
					</a>

					<Link className="with-icon" href={src}>
						<VscEye />
						Fullscreen Preview
					</Link>

					<ClickToCopy value={code}>Copy code</ClickToCopy>
				</div>
			</article>

			{isValid && <div dangerouslySetInnerHTML={{ __html: code }} />}
		</section>
	)
}
