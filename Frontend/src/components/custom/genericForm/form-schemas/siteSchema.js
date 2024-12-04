import { z } from "zod";
import { daysOfWeek } from "./daysOfWeekSchema";
import { locationSchema } from "./locationSchema";
import { ticketPricesSchema } from "./ticketPricesSchema";

export const siteSchema = {
	name: z.string().min(1, "Please add a name for your site"),
	description: z.string().min(1, "Please add a description for your site"),
	cardImage: z
		.any()
		.refine(
			(files) =>
				files === undefined ||
				(files instanceof FileList && Array.from(files).every(file => ['image/png', 'image/jpeg'].includes(file.type))),
			{ message: "Image must be a PNG or JPG file" }
		),
	location: locationSchema,
	openingHours: daysOfWeek, // Opening hours per day of the week
	ticketPrices: ticketPricesSchema, // Explicit keys for ticket categories
	tags: z.array(z.string().min(1)).min(1, "Please add at least one tag"), // assuming ObjectId can be represented as a string// Assuming creatorId can be treated as a string
};