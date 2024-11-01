'use client'

import { useState } from 'react'
import Input from '@/ui/Input'
import { VscEye, VscFile, VscGithub } from 'react-icons/vsc'
import ClickToCopy from '@/ui/ClickToCopy'
import Link from 'next/link'

const DEFAULT_REPO = 'nuotsu/sanitypress'
const DEFAULT_PATH = 'src/styles/app.css'

export default function Home() {
	const [repo, setRepo] = useState(DEFAULT_REPO)
	const [path, setPath] = useState(DEFAULT_PATH)

	const code = `<iframe src="https://github-iframe.vercel.app/${repo}/${path}"></iframe>`

	return (
		<>
			<header>
				<h1>GitHub iframe</h1>
			</header>

			<section>
				<fieldset>
					<legend>Details</legend>

					<div className="flex flex-wrap gap-x-4">
						<Input
							icon={VscGithub}
							placeholder={DEFAULT_REPO}
							defaultValue={repo}
							onChange={(e) => setRepo(e.target.value)}
						/>

						<Input
							icon={VscFile}
							placeholder={DEFAULT_PATH}
							defaultValue={path}
							onChange={(e) => setPath(e.target.value)}
						/>
					</div>
				</fieldset>

				<pre>
					<code>{code}</code>
				</pre>

				<div className="flex flex-wrap gap-2">
					<ClickToCopy value={code}>Copy code</ClickToCopy>

					<Link className="with-icon" href={`/${repo}/${path}`}>
						<VscEye />
						Fullscreen Preview
					</Link>
				</div>

				<div dangerouslySetInnerHTML={{ __html: code }} />
			</section>
		</>
	)
}
