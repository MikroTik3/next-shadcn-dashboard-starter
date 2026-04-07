'use client'

import { IconChevronRight, IconChevronsDown } from '@tabler/icons-react'
import { Command, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem
} from '@/components/ui/sidebar'

import { navItems } from '@/constants/data'

import { Icons } from '../shared/icons'
import { UserAvatarProfile } from '../shared/user-avatar-profile'

export const company = {
	name: 'Studio Admin',
	logo: (
		<>
			<Command />
		</>
	),
	plan: 'Enterprice'
}

export default function AppSidebar() {
	const pathname = usePathname()
	const router = useRouter()

	return (
		<Sidebar variant='inset' collapsible='icon'>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size='lg' asChild>
							<Link href='/dashboard/overview'>
								<div className='text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg bg-black dark:bg-zinc-500'>
									{company.logo}
								</div>
								<div className='flex flex-col gap-0.5 leading-none'>
									<span className='font-semibold'>
										{company.name}
									</span>
									<span className='text-muted-foreground text-xs'>
										{company.plan}
									</span>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent className='overflow-x-hidden'>
				<SidebarGroup>
					<SidebarGroupLabel>Overview</SidebarGroupLabel>
					<SidebarMenu>
						{navItems.map(item => {
							const Icon = item.icon
								? Icons[item.icon]
								: Icons.logo
							return item?.items &&
								item?.items?.length > 0 ? (
								<Collapsible
									key={item.title}
									asChild
									defaultOpen={
										item.isActive
									}
									className='group/collapsible'
								>
									<SidebarMenuItem>
										<CollapsibleTrigger
											asChild
										>
											<SidebarMenuButton
												tooltip={
													item.title
												}
												isActive={
													pathname ===
													item.url
												}
											>
												{item.icon && (
													<Icon />
												)}
												<span>
													{
														item.title
													}
												</span>
												<IconChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
											</SidebarMenuButton>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items?.map(
													subItem => (
														<SidebarMenuSubItem
															key={
																subItem.title
															}
														>
															<SidebarMenuSubButton
																asChild
																isActive={
																	pathname ===
																	subItem.url
																}
															>
																<Link
																	href={
																		subItem.url
																	}
																>
																	<span>
																		{
																			subItem.title
																		}
																	</span>
																</Link>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													)
												)}
											</SidebarMenuSub>
										</CollapsibleContent>
									</SidebarMenuItem>
								</Collapsible>
							) : (
								<SidebarMenuItem
									key={item.title}
								>
									<SidebarMenuButton
										asChild
										tooltip={item.title}
										isActive={
											pathname ===
											item.url
										}
									>
										{
											item.disabled 
												? (
													<div className='text-muted-foreground hover:bg-transparent hover:text-muted-foreground!'>
														<Icon />
														<span>
															{
																item.title
															}
														</span>
															{item.disabled ? <div className='ml-auto rounded-md bg-gray-200 px-2 py-1 text-xs dark:text-gray-800'>Soon</div> : ''}
													</div>
												)
												: (
													<Link
														href={
															item.url
														}
													>
														<Icon />
														<span>
															{
																item.title
															}
														</span>
													</Link>
												)
										}
									</SidebarMenuButton>
								</SidebarMenuItem>
							)
						})}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									size='lg'
									className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
								>
									<UserAvatarProfile />
									<IconChevronsDown className='ml-auto size-4' />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
								side='bottom'
								align='end'
								sideOffset={4}
							>
								<DropdownMenuLabel className='p-0 font-normal'>
									<div className='px-1 py-1.5'>
										<UserAvatarProfile />
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />

								<DropdownMenuGroup>
									<DropdownMenuItem
										onClick={() =>
											router.push(
												'http://localhost:3000/settings'
											)
										}
									>
										<Settings className='mr-2 size-4' />
										Settings
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<LogOut className='mr-2 size-4' />
									Log out
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
