import { redirect } from 'next/navigation'

import { ROUTES } from '@/constants'

export default function Page() {
	redirect(ROUTES.DASHBOARD.ROOT)
}
