import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'GitHub iframe',
	description: '',
	icons: 'https://fav.farm/👨‍💻',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
