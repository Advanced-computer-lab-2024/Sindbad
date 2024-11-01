import { z } from "zod";
import { daysOfWeek } from "./daysOfWeekSchema";
import { locationSchema } from "./locationSchema";
import { ticketPricesSchema } from "./ticketPricesSchema";

export const siteSchema = {
	name: z.string().min(1, "Please add a name for your site"),
	description: z.string().nonempty("Please add a description for your site"),
	imageUris: z
		.array(z.string().url("Invalid image URL"))
		.nonempty("Please add at least one image URL"),
	location: locationSchema,
	openingHours: daysOfWeek, // Opening hours per day of the week
	ticketPrices: ticketPricesSchema, // Explicit keys for ticket categories
	tags: z.array(z.string().nonempty()), // assuming ObjectId can be represented as a string// Assuming creatorId can be treated as a string
};