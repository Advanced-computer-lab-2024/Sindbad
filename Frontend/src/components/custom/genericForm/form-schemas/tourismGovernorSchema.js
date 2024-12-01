import { z } from "zod";

export const tourismGovernorSchema = {
	email: z
		.string()
		.email({ message: "Invalid email address!" })
		.min(1, { message: "Email is required!" }),

	profileImageUri: z
		.any()
		.refine((files) => files instanceof FileList && files.length === 1, 'File is required.'),

	bannerImageUri: z
		.any()
		.refine((files) => files instanceof FileList && files.length === 1, 'File is required.'),
};