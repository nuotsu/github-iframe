'use client'

import { store, getCode } from '@/lib/store'
import Options from './Options'
import Actions from './Actions'
import { VscLoading } from 'react-icons/vsc'
import { cn } from '@/lib/utils'

export default function Home() {
	const { repo, path } = store()
	const code = getCode()

	const isValid = repo?.includes('/') && path

	return (
		<section className="group/root space-y-6">
			<Options />

			<article className="group/code bg-neutral-100">
				<pre className="overflow-x-auto border border-neutral-300 bg-white transition-transform group-has-[button:hover]/code:scale-[1.02]">
					<code className={cn('block p-2', !isValid && 'opacity-50')}>
						{isValid ? code : 'bruh...'}
					</code>
				</pre>

				{isValid && <Actions />}
			</article>

			{isValid && (
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
			)}
		</section>
	)
}
