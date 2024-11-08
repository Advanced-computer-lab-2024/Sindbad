import { z } from "zod";

export const sellerSchema = {
	email: z
		.string()
		.email({ message: "Invalid email address!" })
		.min(1, { message: "Email is required!" }),


	firstName: z.string().optional(),

	lastName: z.string().optional(),

	description: z.string().optional(),

	logoImageUri: z.string(),

    bannerImageUri: z.string(),

	preferredCurrency: z.string(),
};