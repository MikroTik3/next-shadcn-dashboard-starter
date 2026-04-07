'use client'
'use no memo'

import { useSortable } from '@dnd-kit/sortable'
import type { ColumnDef, Row } from '@tanstack/react-table'
import { flexRender } from '@tanstack/react-table'
import {
	Copy,
	Edit,
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

import type { ProductRow } from './schema'

function DragHandle({ id }: { id: number }) {
	const { attributes, listeners } = useSortable({ id })

	return (
		<Button
			{...attributes}
			{...listeners}
			variant='ghost'
			size='icon'
			className='text-muted-foreground size-7'
		>
			<GripVerticalIcon />
			<span className='sr-only'>Drag to reorder</span>
		</Button>
	)
}

function ProductDetailViewer({ item }: { item: ProductRow }) {
	return (
		<Drawer direction='right'>
			<DrawerTrigger asChild>
				<Button
					variant='link'
					className='text-foreground w-fit px-0 text-left'
				>
					{item.title}
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{item.title}</DrawerTitle>
					<DrawerDescription>
						Product detailed information
					</DrawerDescription>
				</DrawerHeader>
				<div className='flex flex-col gap-4 overflow-y-auto px-4 text-sm'>
					<img
						src={item.image}
						alt={item.title}
						className='max-h-64 w-full rounded-md object-cover'
					/>
					<div className='flex flex-col gap-2'>
						<div>
							<strong>Description:</strong>{' '}
							{item.description}
						</div>
						<div>
							<strong>Stock:</strong> {item.stock}
						</div>
						<div>
							<strong>Recommended:</strong>{' '}
							{item.recommended ? 'Yes' : 'No'}
						</div>
						<div>
							<strong>Category:</strong>{' '}
							{item.category}
						</div>
					</div>
					<form className='flex flex-col gap-4'>
						<Input
							defaultValue={item.title}
							placeholder='Title'
						/>
						<Input
							defaultValue={item.description}
							placeholder='Description'
						/>
						<Input
							defaultValue={item.stock}
							type='number'
							placeholder='Stock'
						/>
						<Select
							defaultValue={
								item.recommended ? 'yes' : 'no'
							}
						>
							<SelectTrigger>
								<SelectValue placeholder='Recommended' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value='yes'>
										Yes
									</SelectItem>
									<SelectItem value='no'>
										No
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						<Input
							defaultValue={item.category}
							placeholder='Category'
						/>
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

function createInlineSaveHandler(title: string) {
	return (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		toast.promise(new Promise(resolve => setTimeout(resolve, 1000)), {
			loading: `Saving ${title}`,
			success: 'Saved',
			error: 'Error'
		})
	}
}

export const productColumns: ColumnDef<ProductRow>[] = [
	{
		id: 'drag',
		header: () => null,
		cell: ({ row }) => <DragHandle id={row.original.id} />,
		enableSorting: false,
		enableHiding: false
	},
	{
		accessorKey: 'image',
		header: 'Image',
		cell: ({ row }) => (
			<img
				src={row.original.image}
				alt={row.original.title}
				className='h-12 w-12 rounded object-cover'
			/>
		)
	},
	{
		accessorKey: 'title',
		header: 'Title',
		cell: ({ row }) => <ProductDetailViewer item={row.original} />
	},
	{
		accessorKey: 'description',
		header: 'Description'
	},
	{
		accessorKey: 'stock',
		header: 'Stock',
		cell: ({ row }) => (
			<form onSubmit={createInlineSaveHandler(row.original.title)}>
				<Input
					defaultValue={row.original.stock}
					type='number'
					className='w-16'
				/>
			</form>
		)
	},
	{
		accessorKey: 'recommended',
		header: 'Recommended',
		cell: ({ row }) => (row.original.recommended ? 'Yes' : 'No')
	},
	{
		accessorKey: 'category',
		header: 'Category'
	},
	{
		id: 'actions',
		cell: () => (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='ghost' size='icon'>
						<EllipsisVerticalIcon />
						<span className='sr-only'>Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end' className='w-32'>
					<DropdownMenuItem>
						<Edit className='size-4' />
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Copy className='size-4' />
						Duplicate
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem variant='destructive'>
						<Trash2 className='size-4' />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		),
		enableSorting: false
	}
]

export function DraggableProductRow({ row }: { row: Row<ProductRow> }) {
	const { transform, transition, setNodeRef, isDragging } = useSortable({
		id: row.original.id
	})

	return (
		<TableRow
			ref={setNodeRef}
			data-dragging={isDragging}
			className='relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80'
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
