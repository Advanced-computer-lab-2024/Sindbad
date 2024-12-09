import { z } from "zod";

export const openingHoursSchema = z.object({
	start: z
		.string()
		.regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Incorrect time format"), // 00:00 - 23:59
	end: z
		.string()
		.regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Incorrect time format"),
});