'use client'

import { useEffect } from 'react'

export default function BgColor() {
	useEffect(() => {
		if (typeof window === 'undefined') return

		const { backgroundColor } =
			document.querySelector<HTMLPreElement>('main pre.shiki')?.style ?? {}

		if (!backgroundColor) return

		// set theme-color
		const meta = document.createElement('meta')
		meta.name = 'theme-color'
		meta.content = backgroundColor
		document.head.appendChild(meta)

		// set body bg color
		document.body.style.backgroundColor = backgroundColor
	}, [])

	return null
}
