import { z } from "zod";

export const flightSearchSchema = {
	origin: z.string().min(1, { message: "Origin must be provided" }),

	destination: z.string().min(1, { message: "Destination must be provided" }),

    date: z.string().min(1, { message: "Date must be provided" }),

    adults: z.number().min(1, { message: "At least one adult must be provided" }),
};