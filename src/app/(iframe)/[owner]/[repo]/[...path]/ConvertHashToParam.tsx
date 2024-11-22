'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const regex = /^L((\d+|\d+-\d+),)*(\d+|\d+-\d+)$/

export default function ConvertHashToParam({
	params,
}: {
	params: Record<string, any>
}) {
	const router = useRouter()

	useEffect(() => {
		function handleHashChange() {
			const hash = location.hash.slice(1)

			if (regex.test(hash)) {
				const segments = hash.match(regex)![0].slice(1)
				router.push(`?${new URLSearchParams({ ...params, L: segments })}`)
			}
		}

		handleHashChange()
		window.addEventListener('hashchange', handleHashChange)
		return () => window.removeEventListener('hashchange', handleHashChange)
	}, [])

	return null
}
