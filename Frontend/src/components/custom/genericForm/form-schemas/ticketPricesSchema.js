import { z } from "zod";

export const ticketPricesSchema = z.object({
	child: z.number().min(0, "Child ticket price must be non-negative"),
	student: z.number().min(0, "Student ticket price must be non-negative"),
	adult: z.number().min(0, "Adult ticket price must be non-negative"),
	foreigner: z.number().min(0, "Foreigner ticket price must be non-negative"),
});
