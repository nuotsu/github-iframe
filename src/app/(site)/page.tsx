'use client'

import { store, getSrc } from '@/lib/store'
import Options from './Options'
import Link from 'next/link'
import ClickToCopy from '@/ui/ClickToCopy'
import { VscEye, VscGithub, VscLoading } from 'react-icons/vsc'
import { cn } from '@/lib/utils'

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
		<section className="group/root space-y-6">
			<Options />

			<article className="group/code bg-neutral-100">
				<pre className="overflow-x-auto border border-neutral-300 bg-white transition-transform group-has-[button:hover]/code:scale-[1.02]">
					<code className={cn('block p-2', !isValid && 'opacity-50')}>
						{isValid ? code : 'bruh...'}
					</code>
				</pre>

				<div className="flex flex-wrap justify-end gap-x-4 px-2 py-1 max-md:flex-col">
					<a
						className="with-icon view-file-source"
						href={`https://github.com/${repo}/blob/main/${path}`}
						target="_blank"
					>
						<VscGithub />
						View file source
					</a>

					<Link className="with-icon fullscreen-preview" href={src}>
						<VscEye />
						Fullscreen preview
					</Link>

					<ClickToCopy className="button" value={code}>
						Copy code
					</ClickToCopy>
				</div>
			</article>

			<div className="group grid h-[400px] bg-neutral-50 transition-transform *:col-span-full *:row-span-full group-has-[.fullscreen-preview:hover]/root:scale-[1.02]">
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
