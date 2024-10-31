import { z } from "zod";

export const productSchema = {
	name: z.string().min(1, { message: "Please add the product name" }),

	picture: z
		.string()
		.url({ message: "Please add a valid product picture URL" })
		.min(1, { message: "Please add a product picture URL" }),

	price: z.number().min(0, { message: "Price must be a non-negative number" }),

	description: z
		.string()
		.min(1, { message: "Please add a product description" }),

	quantity: z
		.number()
		.min(0, { message: "Quantity must be a non-negative number" }),

	isArchived: z.boolean(),
};