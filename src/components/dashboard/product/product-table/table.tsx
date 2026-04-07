'use client'
'use no memo'

import {
	DndContext,
	type DragEndEvent,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	type UniqueIdentifier,
	closestCenter,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
	SortableContext,
	arrayMove,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'
import {
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table'
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
	CircleX,
	PlusIcon,
	Settings2
} from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

import { DraggableProductRow, productColumns } from './columns'
import type { ProductRow } from './schema'
import { cn } from '@/lib'

export function ProductsTable({ data: initialData }: { data: ProductRow[] }) {
	const [data, setData] = React.useState(() => initialData)
	const [rowSelection, setRowSelection] = React.useState({})
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [columnFilters, setColumnFilters] =
		React.useState<ColumnFiltersState>([])
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 10
	})

	const sortableId = React.useId()
	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor)
	)

	const dataIds = React.useMemo<UniqueIdentifier[]>(
		() => data.map(({ id }) => id),
		[data]
	)

	const table = useReactTable({
		data,
		columns: productColumns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			pagination
		},
		getRowId: row => row.id.toString(),
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel()
	})

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event
		if (active && over && active.id !== over.id) {
			setData(currentData => {
				const oldIndex = dataIds.indexOf(active.id)
				const newIndex = dataIds.indexOf(over.id)
				return arrayMove(currentData, oldIndex, newIndex)
			})
		}
	}

	return (
		<div className='flex w-full flex-col gap-4'>
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<Input
						placeholder='Search products...'
						className='w-60'
						value={String(
							table
								.getState()
								.columnFilters.find(
									f => f.id === 'title'
								)?.value || ''
						)}
						onChange={e =>
							table.setColumnFilters([
								{
									id: 'title',
									value: e.target.value
								}
							])
						}
					/>
					{table
						.getState()
						.columnFilters.find(f => f.id === 'title')
						?.value ? (
						<Button
							variant='outline'
							className='border-dashed'
							onClick={() =>
								table.setColumnFilters([])
							}
						>
							<CircleX />
							Clear
						</Button>
					) : (
						''
					)}
				</div>
				<div className='flex items-center gap-2'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline' size='sm'>
								<Settings2 />
								Columns
								<ChevronDownIcon />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>
								Toggle columns
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{table
								.getAllColumns()
								.filter(col => col.getCanHide())
								.map(col => (
									<DropdownMenuCheckboxItem
										key={col.id}
										checked={col.getIsVisible()}
										onCheckedChange={val =>
											col.toggleVisibility(
												!!val
											)
										}
									>
										{col.id}
									</DropdownMenuCheckboxItem>
								))}
						</DropdownMenuContent>
					</DropdownMenu>
					<Link
						href='/dashboard/products/new'
						className={cn(
							buttonVariants({
								variant: 'outline',
								size: 'sm'
							})
						)}
					>
						<PlusIcon />
						Add Product
					</Link>
				</div>
			</div>
			<div className='overflow-hidden rounded-lg border'>
				<DndContext
					collisionDetection={closestCenter}
					modifiers={[restrictToVerticalAxis]}
					onDragEnd={handleDragEnd}
					sensors={sensors}
					id={sortableId}
				>
					<Table>
						<TableHeader>
							{table
								.getHeaderGroups()
								.map(headerGroup => (
									<TableRow
										key={headerGroup.id}
									>
										{headerGroup.headers.map(
											header => (
												<TableHead
													key={
														header.id
													}
													colSpan={
														header.colSpan
													}
												>
													{header.isPlaceholder
														? null
														: flexRender(
																header
																	.column
																	.columnDef
																	.header,
																header.getContext()
															)}
												</TableHead>
											)
										)}
									</TableRow>
								))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.length ? (
								<SortableContext
									items={dataIds}
									strategy={
										verticalListSortingStrategy
									}
								>
									{table
										.getRowModel()
										.rows.map(row => (
											<DraggableProductRow
												key={
													row.id
												}
												row={
													row
												}
											/>
										))}
								</SortableContext>
							) : (
								<TableRow>
									<TableCell
										colSpan={
											table.getVisibleLeafColumns()
												.length
										}
										className='text-center'
									>
										No products.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</DndContext>
			</div>
			<div className='flex items-center justify-between px-4'>
				<div className='text-muted-foreground hidden flex-1 text-sm lg:flex'>
					{table.getFilteredSelectedRowModel().rows.length}{' '}
					of {table.getFilteredRowModel().rows.length}{' '}
					row(s) selected.
				</div>
				<div className='flex w-full items-center gap-8 lg:w-fit'>
					<div className='hidden items-center gap-2 lg:flex'>
						<Label
							htmlFor='rows-per-page'
							className='text-sm font-medium'
						>
							Rows per page
						</Label>
						<Select
							value={`${table.getState().pagination.pageSize}`}
							onValueChange={value => {
								table.setPageSize(Number(value))
							}}
						>
							<SelectTrigger
								size='sm'
								className='w-20'
								id='rows-per-page'
							>
								<SelectValue
									placeholder={
										table.getState()
											.pagination
											.pageSize
									}
								/>
							</SelectTrigger>
							<SelectContent side='top'>
								<SelectGroup>
									{[10, 20, 30, 40, 50].map(
										pageSize => (
											<SelectItem
												key={
													pageSize
												}
												value={`${pageSize}`}
											>
												{
													pageSize
												}
											</SelectItem>
										)
									)}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
					<div className='flex w-fit items-center justify-center text-sm font-medium'>
						Page{' '}
						{table.getState().pagination.pageIndex + 1}{' '}
						of {table.getPageCount()}
					</div>
					<div className='ml-auto flex items-center gap-2 lg:ml-0'>
						<Button
							variant='outline'
							className='hidden h-8 w-8 p-0 lg:flex'
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}
						>
							<span className='sr-only'>
								Go to first page
							</span>
							<ChevronsLeftIcon />
						</Button>
						<Button
							variant='outline'
							className='size-8'
							size='icon'
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<span className='sr-only'>
								Go to previous page
							</span>
							<ChevronLeftIcon />
						</Button>
						<Button
							variant='outline'
							className='size-8'
							size='icon'
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							<span className='sr-only'>
								Go to next page
							</span>
							<ChevronRightIcon />
						</Button>
						<Button
							variant='outline'
							className='hidden size-8 lg:flex'
							size='icon'
							onClick={() =>
								table.setPageIndex(
									table.getPageCount() - 1
								)
							}
							disabled={!table.getCanNextPage()}
						>
							<span className='sr-only'>
								Go to last page
							</span>
							<ChevronsRightIcon />
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}
