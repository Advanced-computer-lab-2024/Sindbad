import { z } from "zod";
import { openingHoursSchema } from "./openingHoursSchema";

export const daysOfWeek = z.object({
	monday: openingHoursSchema,
	tuesday: openingHoursSchema,
	wednesday: openingHoursSchema,
	thursday: openingHoursSchema,
	friday: openingHoursSchema,
	saturday: openingHoursSchema,
	sunday: openingHoursSchema,
});