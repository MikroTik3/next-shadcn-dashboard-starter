import { z } from 'zod'

export const userSchema = z.object({
	id: z.number(),
	email: z.string(),
	firstname: z.string(),
	lastname: z.string(),
	phone: z.string(),
	status: z.string()
})

export type UserRow = z.infer<typeof userSchema>
