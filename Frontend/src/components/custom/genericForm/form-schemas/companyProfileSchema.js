import { z } from "zod";

export const companyProfileSchema = {
	name: z.string().min(1, { message: "Company name is required." }),
	description: z
		.string()
		.max(500, { message: "Description cannot be longer than 500 characters." }),
	location: z.string(),
};