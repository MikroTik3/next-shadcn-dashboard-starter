'use client'
import {
	LayoutDashboard,
	Search,
	ShoppingBag,
	Users
} from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@/components/ui/command'
import { IconLayoutKanban, IconMessage2 } from '@tabler/icons-react'

const searchItems = [
	{ group: 'Dashboards', icon: LayoutDashboard, label: 'Overview' },
	{ group: 'Dashboards', icon: ShoppingBag, label: 'Products' },
	{ group: 'Dashboards', icon: Users, label: 'Users' },
	{ group: 'Dashboards', icon: IconLayoutKanban, label: 'Kanban', disabled: true  },
	{ group: 'Dashboards', icon: IconMessage2, label: 'Chat', disabled: true  }
]

export function SearchDialog() {
	const [open, setOpen] = React.useState(false)
	const groups = [...new Set(searchItems.map(item => item.group))]

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen(open => !open)
			}
		}
		document.addEventListener('keydown', down)
		return () => document.removeEventListener('keydown', down)
	}, [])

	return (
		<>
			<Button
				onClick={() => setOpen(true)}
				variant='link'
				className='text-muted-foreground px-0! font-normal hover:no-underline'
			>
				<Search data-icon='inline-start' />
				Search
				<kbd className='bg-muted inline-flex h-5 items-center gap-1 rounded border px-1.5 text-[10px] font-medium select-none'>
					<span className='text-xs'>⌘</span>J
				</kbd>
			</Button>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<Command>
					<CommandInput placeholder='Search dashboards, users, and more…' />
					<CommandList>
						<CommandEmpty>
							No results found.
						</CommandEmpty>
						{groups.map((group, index) => (
							<React.Fragment key={group}>
								{index > 0 && (
									<CommandSeparator />
								)}
								<CommandGroup heading={group}>
									{searchItems
										.filter(
											item =>
												item.group ===
												group
										)
										.map(
											(
												item: any
											) => (
												<CommandItem
													disabled={
														item.disabled
													}
													key={
														item.label
													}
													onSelect={() => {
														if (
															!item.disabled
														) {
															setOpen(
																false
															)
														}
													}}
												>
													{item.icon && (
														<item.icon />
													)}
													<span>
														{
															item.label
														}
													</span>
												</CommandItem>
											)
										)}
								</CommandGroup>
							</React.Fragment>
						))}
					</CommandList>
				</Command>
			</CommandDialog>
		</>
	)
}
