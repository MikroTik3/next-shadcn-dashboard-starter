'use client'

import { useRouter } from 'next/navigation'
import { FaDiscord, FaGithub, FaGoogle, FaTelegram } from 'react-icons/fa'

import { Button } from '../ui/button'

import { ROUTES } from '@/constants'

const socials = [
	{ icon: FaGoogle, name: 'google' },
	{ icon: FaGithub, name: 'github' },
	{ icon: FaDiscord, name: 'discord' },
	{ icon: FaTelegram, name: 'telegram' }
]

export function AuthSocial({ disabled }: { disabled: boolean }) {
	const router = useRouter()

	return (
		<div className='flex flex-col gap-4'>
			<div className='grid w-full grid-cols-4 gap-4'>
				{socials.map(({ icon: Icon, name }) => (
					<Button
						key={name}
						disabled={disabled}
						variant='outline'
						className='[&_svg]:size-[21px]'
						onClick={() =>
							router.push(ROUTES.DASHBOARD.ROOT)
						}
					>
						<Icon />
					</Button>
				))}
			</div>
		</div>
	)
}
