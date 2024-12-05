import { z } from "zod";

export const itinerarySchema = {
	name: z.string().min(1, { message: "Please add the name of the itinerary" }),
	description: z.string().min(1, { message: "Please add the description of the itinerary" }),

	cardImage: z
		.any()
		.refine(
			(files) =>
				files === undefined ||
				(files instanceof FileList && Array.from(files).every(file => ['image/png', 'image/jpeg'].includes(file.type))),
			{ message: "Image must be a PNG or JPG file" }
		),

	activities: z
		.array(z.string()
			.min(1, { message: "Activity ID must be provided" })
			.regex(
				/^(https?:\/\/)?localhost:5173\/app\/activity\/[a-fA-F0-9]{24}$/,
				{ message: "Invalid activity URL" }
			))
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
		z.date()
			.refine(
				(date) => date > new Date(),
				{ message: "Date must be in the future" }
			)
	).min(1, { message: "Please specify available dates" }),

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