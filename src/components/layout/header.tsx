import { FaGithub } from 'react-icons/fa6'

import { SearchDialog } from '../shared/search-dialog'
import { UserNav } from '../shared/user-nav'
import { buttonVariants } from '../ui/button'
import { Separator } from '../ui/separator'
import { SidebarTrigger } from '../ui/sidebar'

import { cn } from '@/lib'

export default function Header() {
	return (
		<header className='flex h-12 shrink-0 items-center justify-between gap-2 border-b transition-[width,height] ease-linear'>
			<div className='flex items-center gap-2 px-4'>
				<SidebarTrigger className='-ml-1' />
				<div className='flex items-center'>
					<Separator
						orientation='vertical'
						className='h-5'
					/>
				</div>
				<SearchDialog />
			</div>

			<div className='flex items-center gap-2 px-4'>
				<a
					href='https://github.com/MikroTik2/next-shadcn-dashboard-starter'
					target='_blank'
					className={cn(
						buttonVariants({
							variant: 'outline',
							size: 'icon'
						})
					)}
				>
					<FaGithub />
				</a>
				<div className='flex items-center'>
					<Separator
						orientation='vertical'
						className='h-5'
					/>
				</div>
				<UserNav />
			</div>
		</header>
	)
}
