import { z } from "zod";

export const sellerSchema = {
	email: z
		.string()
		.email({ message: "Invalid email address!" })
		.min(1, { message: "Email is required!" }),


	firstName: z.string().optional(),

	lastName: z.string().optional(),

	description: z.string().optional(),

	profileImageUri: z
		.any()
		.refine((files) => files instanceof FileList && files.length === 1, 'File is required.'),

	bannerImageUri: z
		.any()
		.refine((files) => files instanceof FileList && files.length === 1, 'File is required.'),

	preferredCurrency: z.string(),
};