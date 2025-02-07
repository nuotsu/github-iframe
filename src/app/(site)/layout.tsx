import Header from './Header'
import Footer from './Footer'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import '@/app/app.css'

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
			<body className="bg-white">
				<div className="mx-auto flex min-h-screen max-w-(--breakpoint-sm) flex-col gap-6 p-4">
					<Header />
					<main>{children}</main>
					<Footer />
				</div>

				<Analytics />
			</body>
		</html>
	)
}
