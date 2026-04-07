'use client'

import { LogOut, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { UserAvatarProfile } from './user-avatar-profile'

export function UserNav() {
	const router = useRouter()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='relative h-8 w-8 rounded-full'>
					<UserAvatarProfile />
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-56'
				align='end'
				sideOffset={10}
				forceMount
			>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm leading-none font-medium'>
							Mark Kaplan
						</p>
						<p className='text-muted-foreground text-xs leading-none'>
							kaplan@gmail.com
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={() =>
							router.push(
								'http://localhost:3000/account/settings'
							)
						}
					>
						<Settings />
						Settings
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<LogOut />
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
