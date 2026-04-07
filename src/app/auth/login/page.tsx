import { Metadata } from 'next'

import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
	title: 'Studio Admin - Modern Next.js Dashboard Starter Template'
}

export default async function Page() {
	return <LoginForm />
}
