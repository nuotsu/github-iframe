'use client'

import { getCode, getSrc, store } from '@/lib/store'
import getHtmlUrl from '@/lib/octokit/getHtmlUrl'
import Link from 'next/link'
import ClickToCopy from '@/ui/ClickToCopy'
import { VscEye, VscGithub } from 'react-icons/vsc'

export default function Actions() {
	const { highlight } = store()
	const src = getSrc()
	const code = getCode()
	const html_url = getHtmlUrl()

	return (
		<div className="flex flex-wrap justify-end gap-x-4 px-2 py-1 max-md:flex-col">
			<a
				className="with-icon view-file-source anim-fade-to-l [[href='#']]:hidden"
				href={`${html_url}${highlight ? `#L${highlight}` : ''}`}
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
	)
}
