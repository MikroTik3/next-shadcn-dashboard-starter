import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

import '@/styles/globals.css'

import { SEO, outfit } from '@/constants'

export const metadata: Metadata = {
	title: {
		absolute: SEO.name,
		template: `%s — ${SEO.name}`
	},
	description: SEO.description,
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon.ico'
	}
}

export const viewport: Viewport = {
	themeColor: '#000000'
}

export default function RootLayout({
	children
}: Readonly<{ children: ReactNode }>) {
	return (
		<html
			className={outfit.variable}
			lang='en'
			suppressHydrationWarning
		>
			<body className='font-sans'>
				<TooltipProvider>
					{children}
					<Toaster richColors theme='light' />
				</TooltipProvider>
			</body>
		</html>
	)
}
