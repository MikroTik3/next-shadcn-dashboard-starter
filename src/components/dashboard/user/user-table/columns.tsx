'use client'
'use no memo'

import { useSortable } from '@dnd-kit/sortable'
import type { ColumnDef, Row } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import {
	Copy,
	EllipsisVerticalIcon,
	GripVerticalIcon,
	Trash2
} from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from '@/components/ui/drawer'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { TableCell, TableRow } from '@/components/ui/table'

import type { UserRow } from './schema'
import { UserEditFormSheetTrigger } from '../user-edit'

function UserDetailViewer({ item }: { item: UserRow }) {
	return (
		<Drawer direction='right'>
			<DrawerTrigger asChild>
				<Button variant='link' className='w-fit px-0 text-left'>
					{item.firstname} {item.lastname}
				</Button>
			</DrawerTrigger>

			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>
						{item.firstname} {item.lastname}
					</DrawerTitle>
					<DrawerDescription>
						User details
					</DrawerDescription>
				</DrawerHeader>

				<div className='flex flex-col gap-4 px-4 text-sm'>
					<div>
						<strong>Phone:</strong> {item.phone}
					</div>
					<div>
						<strong>Status:</strong> {item.status}
					</div>

					<form className='flex flex-col gap-4'>
						<Input
							defaultValue={item.firstname}
							placeholder='First name'
						/>
						<Input
							defaultValue={item.lastname}
							placeholder='Last name'
						/>
						<Input
							defaultValue={item.phone}
							placeholder='Phone'
						/>

						<Select defaultValue={item.status}>
							<SelectTrigger>
								<SelectValue placeholder='Status' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='active'>
										Active
									</SelectItem>
									<SelectItem value='inactive'>
										Inactive
									</SelectItem>
									<SelectItem value='banned'>
										Banned
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</form>
				</div>

				<DrawerFooter>
					<Button>Save</Button>
					<DrawerClose asChild>
						<Button variant='outline'>Close</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}

function createInlineSaveHandler(name: string) {
	return (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		toast.promise(new Promise(res => setTimeout(res, 1000)), {
			loading: `Saving ${name}`,
			success: 'Saved',
			error: 'Error'
		})
	}
}

export const userColumns: ColumnDef<UserRow>[] = [
	{
		accessorFn: row => `${row.firstname} ${row.lastname}`,
		header: 'Full name',
		cell: ({ row }) => (
			<div className='flex flex-col'>
				<span className='font-medium'>
					{row.original.firstname} {row.original.lastname}
				</span>
				<span className='text-muted-foreground text-xs'>
					{row.original.email}
				</span>
			</div>
		)
	},
	{
		id: 'fullName',
		header: 'User',
		cell: ({ row }) => <UserDetailViewer item={row.original} />
	},
	{
		accessorKey: 'phone',
		header: 'Phone'
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => (
			<form
				onSubmit={createInlineSaveHandler(
					row.original.firstname
				)}
			>
				<Select defaultValue={row.original.status}>
					<SelectTrigger className='w-28'>
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='active'>
							Active
						</SelectItem>
						<SelectItem value='inactive'>
							Inactive
						</SelectItem>
						<SelectItem value='banned'>
							Banned
						</SelectItem>
					</SelectContent>
				</Select>
			</form>
		)
	},
	{
		id: 'actions',
		cell: () => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' size='icon'>
						<EllipsisVerticalIcon />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align='end' className='w-32'>
					<UserEditFormSheetTrigger />
					<DropdownMenuItem>
						<Copy className='size-4' /> Duplicate
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem variant='destructive'>
						<Trash2 className='size-4' /> Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		),
		enableSorting: false
	}
]

export function DraggableUserRow({ row }: { row: Row<UserRow> }) {
	const { transform, transition, setNodeRef, isDragging } = useSortable({
		id: row.original.id
	})

	return (
		<TableRow
			ref={setNodeRef}
			data-dragging={isDragging}
			className='data-[dragging=true]:opacity-80'
			style={{
				transform: transform
					? `translate3d(${transform.x}px, ${transform.y}px, 0)`
					: undefined,
				transition
			}}
		>
			{row.getVisibleCells().map(cell => (
				<TableCell key={cell.id}>
					{flexRender(
						cell.column.columnDef.cell,
						cell.getContext()
					)}
				</TableCell>
			))}
		</TableRow>
	)
}
