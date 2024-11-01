import { z } from "zod";
import { locationSchema } from "./locationSchema";

export const activitySchema = {
	name: z.string().min(1, { message: "Please add the name of the activity" }),

	dateTime: z
		.string({
			required_error: "Please add the date of the activity",
		})
		.refine((val) => !isNaN(Date.parse(val)), {
			message: "Invalid date",
		}),

	location: locationSchema,

	price: z.object({
		min: z
			.number()
			.min(1, "Start time must be a positive number"),
		max: z
			.number()
			.min(1, "End time must be a positive number")
	}),

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