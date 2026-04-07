import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/sheet'
import { useState } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus } from 'lucide-react'

interface UserEditFormProps {
	open: boolean
	onOpenChange: (open: boolean) => void
}

const userSchema = z.object({
	firstname: z.string().min(1, 'First name is required'),
	lastname: z.string().min(1, 'Last name is required'),
	email: z.string().email('Invalid email address'),
	phone: z.string().min(1, 'Phone number is required'),
	status: z.string()
})

export type User = z.infer<typeof userSchema>

export function UserEditFormSheet({ open, onOpenChange }: UserEditFormProps) {
	const form = useForm<User>({
		resolver: zodResolver(userSchema),
		defaultValues: {
			firstname: '',
			lastname: '',
			email: '',
			phone: '',
			status: 'Active'
		}
	})

	async function onSubmit(values: User) {
		console.log(values)
	}

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent className='flex flex-col'>
				<SheetHeader>
					<SheetTitle>New User</SheetTitle>
					<SheetDescription>
						Update the user details below.
					</SheetDescription>
				</SheetHeader>

				<div className='flex-1 overflow-auto p-4'>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FieldGroup>
							<div className='grid grid-cols-2 gap-5'>
								<Controller
									name='firstname'
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
												First
												name
											</FieldLabel>

											<Input
												{...field}
												placeholder='Enter user firstname'
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
									name='lastname'
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
												Last
												name
											</FieldLabel>

											<Input
												{...field}
												placeholder='Enter user lastname'
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
								name='email'
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
											Email
										</FieldLabel>

										<Input
											{...field}
											placeholder='Enter email'
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
								name='phone'
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
											Phone
										</FieldLabel>

										<Input
											{...field}
											placeholder='Enter phone'
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
						</FieldGroup>

                                    <div className='mt-5 flex items-center gap-2'>
                                          <Button>
                                                Edit
                                          </Button>
                                          <Button variant="outline">
                                                Cancel
                                          </Button>
                                    </div>
					</form>
				</div>
			</SheetContent>
		</Sheet>
	)
}

export function UserEditFormSheetTrigger() {
      const [open, setOpen] = useState<boolean>(false);

      return (
            <>
                  <Button onClick={() => setOpen(true)} className={cn(buttonVariants({ size: 'sm', variant: 'ghost' }), 'w-full text-black bg-white justify-start ')}>
                        <Plus className='size-4'/>
				Edit User
                  </Button>
                  <UserEditFormSheet open={open} onOpenChange={setOpen} />
            </>
      );
}