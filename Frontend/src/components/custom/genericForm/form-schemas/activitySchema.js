import { z } from "zod";
import { locationSchema } from "./locationSchema";

export const activitySchema = {
	name: z.string().min(1, { message: "Please add the name of the activity" }),
	description: z.string().min(1, { message: "Please add a description of the activity" }),

	cardImage: z
		.any()
		.refine(
			(files) =>
				files === undefined ||
				(files instanceof FileList && Array.from(files).every(file => ['image/png', 'image/jpeg'].includes(file.type))),
			{ message: "Image must be a PNG or JPG file" }
		),

	dateTime: z.date()
		.refine(
			(date) => date > new Date(),
			{ message: "Date must be in the future" }
		),

	location: locationSchema,

	price: z.number().min(0, { message: "Price must be a non-negative number" }),

	category: z
		.string()
		.min(1, { message: "Please add the category of the activity" }),

	tags: z
		.array(z.string())
		.max(10, { message: "You can only add up to 10 tags." }),

	discounts: z
		.number()
		.min(0, { message: "Discount must be between 0 and 100" })
		.max(100, { message: "Discount must be between 0 and 100" }),

	isBookingOpen: z.boolean(),
};