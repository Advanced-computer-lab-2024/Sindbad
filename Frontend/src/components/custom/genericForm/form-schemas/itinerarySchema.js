import { z } from "zod";

export const itinerarySchema = {
	name: z.string().min(1, { message: "Please add the name of the itinerary" }),

	activities: z
		.array(z.string().min(1, { message: "Activity ID must be provided" }))
		.min(1, { message: "Please add at least one activity" }),

	locations: z
		.array(z.string().min(1, { message: "Location must be provided" }))
		.min(1, { message: "Please add the locations of the itinerary" }),

	timeline: z
		.array(z.string().min(1, { message: "Timeline must be provided" }))
		.min(1, { message: "Please add the timeline of the itinerary" }),

	duration: z.number().min(0, { message: "Please specify a valid duration" }),

	languages: z
		.array(z.string().min(1, { message: "Language must be provided" }))
		.min(1, { message: "Please add the supported languages" }),

	price: z.number().min(0, { message: "Price must be a non-negative number" }),

	availableDatesTimes: z.array(
		z.object({
			dateTime: z.string().min(1, { message: "Date and time must be provided" }),
			headCount: z.number().default(0),
		})
	),

	accessibility: z
		.array(
			z.string().min(1, { message: "Accessibility option must be provided" })
		)
		.min(1, { message: "Please specify accessibility options" }),

	pickUpLocation: z
		.string()
		.min(1, { message: "Please add the pick-up location" }),

	dropOffLocation: z.string().min(1, { message: "Please add the drop-off location" }),

};