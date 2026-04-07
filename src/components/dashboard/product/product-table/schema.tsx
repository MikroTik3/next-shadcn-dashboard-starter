import { z } from 'zod'

export const productSchema = z.object({
	id: z.number(),
	image: z.string().url(),
	title: z.string(),
	price: z.number(),
	description: z.string(),
	stock: z.number().min(0),
	recommended: z.boolean(),
	category: z.string()
})

export type ProductRow = z.infer<typeof productSchema>
