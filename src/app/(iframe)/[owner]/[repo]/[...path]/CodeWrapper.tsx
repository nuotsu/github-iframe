'use client'

import { useEffect, useRef, type ComponentProps } from 'react'

export default function CodeWrapper({
	scrollTo,
	...props
}: {
	scrollTo?: string
} & ComponentProps<'article'>) {
	const ref = useRef<HTMLElement>(null)

	useEffect(() => {
		if (!ref.current || !scrollTo || typeof window === 'undefined') return

		const target = ref.current.querySelector(
			`[data-line="${scrollTo}"]`,
		) as HTMLElement

		window.scrollTo({
			top: target.offsetTop,
			behavior: 'smooth',
		})
	}, [ref, scrollTo])

	return <article ref={ref} {...props} />
}
