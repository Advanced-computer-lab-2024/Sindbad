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
		.refine(
			(files) =>
				files === undefined ||
				(files instanceof FileList && Array.from(files).every(file => ['image/png', 'image/jpeg'].includes(file.type))),
			{ message: "profileImageUri must be a PNG or JPG file" }
		),

	bannerImageUri: z
		.any()
		.refine(
			(files) =>
				files === undefined ||
				(files instanceof FileList && Array.from(files).every(file => ['image/png', 'image/jpeg'].includes(file.type))),
			{ message: "profileImageUri must be a PNG or JPG file" }
		),

	preferredCurrency: z.string(),
};