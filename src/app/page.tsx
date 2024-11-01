'use client'

import { useState } from 'react'
import Input from '@/ui/Input'
import { VscEye, VscFile, VscGithub, VscStarFull } from 'react-icons/vsc'
import ClickToCopy from '@/ui/ClickToCopy'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const DEFAULT_PATH = 'src/app/globals.css'

export default function Home() {
	const [repo, setRepo] = useState('nuotsu/github-iframe')
	const [path, setPath] = useState(DEFAULT_PATH)

	const code = [
		`<iframe`,
		`\tsrc="https://github-iframe.vercel.app/${repo}/${path}"`,
		`\twidth="100%"`,
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
						icon={VscGithub}
						defaultValue={repo}
						onChange={(e) => setRepo(e.target.value)}
						pattern=".+/.+"
					/>

					<Input
						title="path/to/file"
						icon={VscFile}
						defaultValue={path}
						onChange={(e) => setPath(e.target.value)}
					/>
				</div>
			</fieldset>

			<article className="group">
				<pre className="overflow-x-auto border group-has-[button:hover]:border-black/30">
					<code className={cn('block p-2', !isValid && 'opacity-50')}>
						{isValid ? code : 'bruh...'}
					</code>
				</pre>

				<div className="flex flex-wrap justify-end gap-4">
					<Link className="with-icon" href={`/${repo}/${path}`}>
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
