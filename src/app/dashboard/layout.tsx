import type { Metadata } from 'next'

import AppSidebar from '@/components/layout/app-sidebar'
import Header from '@/components/layout/header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export const metadata: Metadata = {
	title: 'Studio Admin - Modern Next.js Dashboard Starter Template'
}

export default async function DashboardLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<SidebarProvider defaultOpen={false}>
			<AppSidebar />
			<SidebarInset>
				<Header />
				{children}
			</SidebarInset>
		</SidebarProvider>
	)
}
