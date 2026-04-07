import { Avatar, AvatarFallback } from '../ui/avatar'

export function UserAvatarProfile() {
	return (
		<div className='flex items-center gap-2'>
			<Avatar className='size-8'>
				<AvatarFallback>MK</AvatarFallback>
			</Avatar>
			<div className='grid flex-1 text-left text-sm leading-tight'>
				<span className='truncate font-semibold'>
					Mark Kaplan
				</span>
				<span className='truncate text-xs'>
					kaplan@gmail.com
				</span>
			</div>
		</div>
	)
}
