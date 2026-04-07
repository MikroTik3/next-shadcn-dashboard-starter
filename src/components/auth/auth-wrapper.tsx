'use client'

import type { ReactNode } from 'react'

interface AuthWrapperProps {
	children: ReactNode
	heading: string
	description?: string
}

export function AuthWrapper({
	children,
	heading,
	description
}: AuthWrapperProps) {
	return (
		<div className='relative container flex min-h-svh max-w-full flex-col items-center justify-center lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
			<div className='w-full px-4 py-8 sm:px-6 md:py-12'>
				<div className='mx-auto flex w-full max-w-95 flex-col justify-center space-y-5'>
					<div className='flex flex-col space-y-2 text-center'>
						<h1 className='text-2xl font-semibold tracking-tight'>
							{heading}
						</h1>
						{description && (
							<p className='text-muted-foreground text-sm'>
								{description}
							</p>
						)}
					</div>
					<div className='p-0'>{children}</div>
				</div>
				<div className='text-muted-foreground absolute right-4 bottom-4 flex items-center justify-center gap-4'></div>
			</div>

			<div className='text-primary relative hidden h-full flex-col p-10 lg:flex'>
				<div className='bg-primary/5 absolute inset-0 border-l'></div>
			</div>
		</div>
	)
}
