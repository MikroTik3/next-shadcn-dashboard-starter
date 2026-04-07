'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { FileUploader } from '@/components/shared/file-uploader'
import PageContainer from '@/components/shared/page-container'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

import { cn } from '@/lib'

const productSchema = z.object({
	images: z.array(z.string()).min(1, 'At least one image is required'),
	name: z.string().min(1, 'Name is required'),
	description: z.string().min(1, 'Description is required'),
	price: z.string().min(1, 'Price is required'),
	stock: z.number().min(0, 'Stock must be >= 0'),
	recommended: z.boolean(),
	category: z.string().min(1, 'Category is required')
})

export type Product = z.infer<typeof productSchema>

export function ProductNewForm() {
	const form = useForm<Product>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			images: [],
			name: '',
			description: '',
			price: '',
			stock: 0,
			recommended: false,
			category: ''
		}
	})

	async function onSubmit(values: Product) {
		console.log(values)
	}

	return (
		<PageContainer scrollable={false}>
			<Card className='mx-auto w-full'>
				<CardHeader>
					<CardTitle className='text-2xl font-bold'>
						Create new product
					</CardTitle>
				</CardHeader>

				<CardContent>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<Controller
								name='images'
								control={form.control}
								render={({
									field,
									fieldState
								}) => (
									<Field
										data-invalid={
											fieldState.invalid
										}
									>
										<FieldLabel>
											Images
										</FieldLabel>

										<FileUploader
											value={
												field.value
											}
											onChange={
												field.onChange
											}
										/>

										{fieldState.error && (
											<FieldError
												errors={[
													fieldState.error
												]}
											/>
										)}
									</Field>
								)}
							/>

							<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
								<Controller
									name='name'
									control={form.control}
									render={({
										field,
										fieldState
									}) => (
										<Field
											data-invalid={
												fieldState.invalid
											}
										>
											<FieldLabel>
												Name
											</FieldLabel>
											<Input
												{...field}
												placeholder='Product title'
											/>
											{fieldState.error && (
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
									name='price'
									control={form.control}
									render={({
										field,
										fieldState
									}) => (
										<Field
											data-invalid={
												fieldState.invalid
											}
										>
											<FieldLabel>
												Price
											</FieldLabel>
											<Input
												{...field}
												placeholder='100$'
											/>
											{fieldState.error && (
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
									name='stock'
									control={form.control}
									render={({
										field,
										fieldState
									}) => (
										<Field
											data-invalid={
												fieldState.invalid
											}
										>
											<FieldLabel>
												Stock
											</FieldLabel>
											<Input
												type='number'
												{...field}
											/>
											{fieldState.error && (
												<FieldError
													errors={[
														fieldState.error
													]}
												/>
											)}
										</Field>
									)}
								/>
							</div>

							<Controller
								name='description'
								control={form.control}
								render={({
									field,
									fieldState
								}) => (
									<Field
										data-invalid={
											fieldState.invalid
										}
									>
										<FieldLabel>
											Description
										</FieldLabel>
										<Textarea
											{...field}
										/>
										{fieldState.error && (
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
								name='category'
								control={form.control}
								render={({
									field,
									fieldState
								}) => (
									<Field
										data-invalid={
											fieldState.invalid
										}
									>
										<FieldLabel>
											Category
										</FieldLabel>

										<Select
											value={
												field.value
											}
											onValueChange={
												field.onChange
											}
										>
											<SelectTrigger>
												<SelectValue placeholder='Select category' />
											</SelectTrigger>

											<SelectContent>
												<SelectItem value='electronics'>
													Electronics
												</SelectItem>
												<SelectItem value='clothes'>
													Clothes
												</SelectItem>
												<SelectItem value='other'>
													Other
												</SelectItem>
											</SelectContent>
										</Select>

										{fieldState.error && (
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
								name='recommended'
								control={form.control}
								render={({ field }) => (
									<Field className='flex flex-row items-center justify-between rounded-lg border p-3'>
										<div>
											<FieldLabel>
												Recommended
											</FieldLabel>
											<p className='text-muted-foreground text-sm'>
												Show on
												homepage
											</p>
										</div>

										<Switch
											checked={
												field.value
											}
											onCheckedChange={
												field.onChange
											}
										/>
									</Field>
								)}
							/>

							<div className='flex items-center justify-end gap-5'>
								<Link
									href='/dashboard/products'
									className={cn(
										buttonVariants({
											size: 'lg',
											variant: 'outline'
										})
									)}
								>
									Back
								</Link>
								<Button type='submit' size='lg'>
									Add
								</Button>
							</div>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</PageContainer>
	)
}
