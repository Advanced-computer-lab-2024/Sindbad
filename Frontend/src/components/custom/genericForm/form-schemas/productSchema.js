import { z } from "zod";

export const productSchema = {
	name: z.string().min(1, { message: "Please add the product name" }),

	description: z
		.string()
		.min(1, { message: "Please add a product description" }),

	cardImage: z
		.any()
		.refine(
			(files) =>
				files === undefined ||
				(files instanceof FileList && Array.from(files).every(file => ['image/png', 'image/jpeg'].includes(file.type))),
			{ message: "Image must be a PNG or JPG file" }
		),

	price: z.number().min(0, { message: "Price must be a non-negative number" }),

	quantity: z
		.number()
		.min(0, { message: "Quantity must be a non-negative number" }),
};