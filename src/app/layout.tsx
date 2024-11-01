import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'GitHub iframe',
	description: 'Display live GitHub code in an iframe',
	icons: 'https://fav.farm/👨‍💻',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<main>{children}</main>
				<Analytics />
			</body>
		</html>
	)
}
