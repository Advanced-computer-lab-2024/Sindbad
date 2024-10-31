import { z } from "zod";

export const openingHoursSchema = z.object({
	start: z
		.number()
		.min(0, "Start time must be a positive number")
		.max(1440, "Start time must be within a 24-hour range"),
	end: z
		.number()
		.min(0, "End time must be a positive number")
		.max(1440, "End time must be within a 24-hour range"),
});