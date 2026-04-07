import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
	turbopack: {
		root: path.resolve()
	},
	reactStrictMode: true,
	poweredByHeader: false,
	output: 'standalone',
	trailingSlash: false,
	skipTrailingSlashRedirect: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '*'
			}
		]
	},
	experimental: {
		optimizePackageImports: ['tailwindcss']
	}
}

export default nextConfig
