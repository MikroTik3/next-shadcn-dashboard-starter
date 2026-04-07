'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LucideEye, LucideEyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator
} from '../ui/field'
import { Spinner } from '../ui/spinner'

import { AuthSocial } from './auth-social'
import { AuthWrapper } from './auth-wrapper'
import { ROUTES } from '@/constants'

const loginSchema = z.object({
	email: z
		.string()
		.email({ message: 'Please enter a valid email address' }),
	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters' })
		.max(128, {
			message: 'Password must not exceed 128 characters'
		})
})

export type Login = z.infer<typeof loginSchema>

export function LoginForm() {
	const [isVisible, setIsVisible] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const router = useRouter()

	const form = useForm<Login>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	async function onSubmit(data: z.infer<typeof loginSchema>) {
		setIsLoading(true)

		await new Promise(resolve => setTimeout(resolve, 1500))

		setIsLoading(false)

		toast('You submitted the following values:', {
			description: (
				<pre className='bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4'>
					<code>{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
			position: 'bottom-right',
			classNames: {
				content: 'flex flex-col gap-2'
			},
			style: {
				'--border-radius': 'calc(var(--radius)  + 4px)'
			} as React.CSSProperties
		})

		router.push(ROUTES.DASHBOARD.ROOT)
		form.reset()
	}

	return (
		<AuthWrapper
			heading='Log in to your account'
			description='Use your email and password to log in, as registered on the site'
		>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='space-y-4'>
					<FieldGroup>
						<Controller
							name='email'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field
									data-invalid={
										fieldState.invalid
									}
								>
									<FieldLabel htmlFor='form-rhf-demo-title'>
										Email
									</FieldLabel>
									<Input
										{...field}
										id='form-rhf-demo-title'
										disabled={isLoading}
										aria-invalid={
											fieldState.invalid
										}
										placeholder='Enter your email'
										autoComplete='off'
									/>
									{fieldState.invalid && (
										<FieldError
											errors={[
												fieldState.error
											]}
										/>
									)}
								</Field>
							)}
						/>

						<Controller
							name='password'
							control={form.control}
							render={({ field, fieldState }) => (
								<Field
									data-invalid={
										fieldState.invalid
									}
								>
									<FieldLabel htmlFor='form-rhf-demo-title'>
										Password
									</FieldLabel>

									<div className='relative'>
										<Input
											{...field}
											id='form-rhf-demo-title'
											disabled={
												isLoading
											}
											aria-invalid={
												fieldState.invalid
											}
											type={
												isVisible
													? 'type'
													: 'password'
											}
											placeholder='Enter your password'
											autoComplete='off'
										/>
										{fieldState.invalid && (
											<FieldError
												errors={[
													fieldState.error
												]}
											/>
										)}

										<div
											className='absolute top-1.5 right-3'
											onClick={() =>
												setIsVisible(
													!isVisible
												)
											}
										>
											{isVisible ? (
												<LucideEyeOff className='size-5 opacity-50 hover:opacity-80' />
											) : (
												<LucideEye className='size-5 opacity-50 hover:opacity-80' />
											)}
										</div>
									</div>
								</Field>
							)}
						/>

						<Button
							type='submit'
							disabled={isLoading}
							className='w-full'
						>
							{isLoading ? <Spinner /> : ''}
							Continue
						</Button>

						<FieldSeparator>
							Or continue with
						</FieldSeparator>

						<AuthSocial disabled={isLoading} />
					</FieldGroup>
				</div>
			</form>
		</AuthWrapper>
	)
}
