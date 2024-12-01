import { z } from "zod";

export const adminSchema = {
	email: z
		.string()
		.email({ message: "Invalid email address!" })
		.min(1, { message: "Email is required!" }),

	profileImageUri: z
		.any()
		.optional()
		.refine(
			(files) =>
				files === undefined ||
				(files instanceof FileList && Array.from(files).every(file => ['image/png', 'image/jpeg'].includes(file.type))),
			{ message: "profileImageUri must be a PNG or JPG file" }
		),

	bannerImageUri: z
		.any()
		.optional()
		.refine(
			(files) =>
				files === undefined ||
				(files instanceof FileList && Array.from(files).every(file => ['image/png', 'image/jpeg'].includes(file.type))),
			{ message: "profileImageUri must be a PNG or JPG file" }
		),
};