import type { Route } from 'next'

export const ROUTES = {
	AUTH: {
		LOGIN: '/auth/login' as Route
	},

	DASHBOARD: {
		ROOT: '/dashboard/overview' as Route
	}
} as const
