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

		ref.current
			.querySelector(`[data-line="${scrollTo}"]`)
			?.scrollIntoView({ behavior: 'smooth' })
	}, [ref, scrollTo])

	return <article ref={ref} {...props} />
}
