'use client'

import { store, getSrc } from '@/lib/store'
import ClickToCopy from '@/ui/ClickToCopy'
import Link from 'next/link'
import { VscEye, VscGithub, VscLoading } from 'react-icons/vsc'
import { cn } from '@/lib/utils'
import Options from './Options'

export default function Home() {
	const { repo, path } = store()
	const src = getSrc()

	const code = [
		`<iframe`,
		`\tsrc="${src}"`,
		`\twidth="100%" height="400px"`,
		`\ttitle="${repo}/${path}"`,
		`></iframe>`,
	].join('\n')

	const isValid = repo && path

	return (
		<section className="space-y-6">
			<Options />

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

			<div className="group grid h-[400px] *:col-span-full *:row-span-full">
				<p className="with-icon m-auto">
					<VscLoading className="animate-spin" />
					Loading...
				</p>

				{isValid && (
					<div
						className="relative"
						dangerouslySetInnerHTML={{ __html: code }}
					/>
				)}
			</div>
		</section>
	)
}
