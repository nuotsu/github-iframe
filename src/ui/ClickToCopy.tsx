'use client'

import { useState, type ComponentProps } from 'react'
import { VscCheck, VscCopy } from 'react-icons/vsc'

export default function ClickToCopy({
	value,
	children,
}: { value?: string } & ComponentProps<'button'>) {
	const [copied, setCopied] = useState(false)

	return (
		<button
			className="with-icon"
			onClick={() => {
				if (typeof window === 'undefined' || !value) return
				navigator.clipboard.writeText(value)
				setCopied(true)
				setTimeout(() => setCopied(false), 1000)
			}}
			title="Click to copy"
		>
			{copied ? <VscCheck /> : <VscCopy />}
			{children}
		</button>
	)
}