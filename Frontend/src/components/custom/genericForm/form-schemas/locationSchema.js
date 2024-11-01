import { z } from "zod";

export const locationSchema = z.object({
	address: z.string().nonempty("Address is required"),
	coordinates: z.object({
		lat: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
		lng: z
			.number()
			.min(-180)
			.max(180, "Longitude must be between -180 and 180"),
	}),
});