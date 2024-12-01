import { z } from "zod";

export const adminSchema = {
	email: z
		.string()
		.email({ message: "Invalid email address!" })
		.min(1, { message: "Email is required!" }),

	profileImageUri: z
		.any()
		.optional()
		.refine((files) => files === undefined || files instanceof FileList,
			{ message: "Invalid file type!" }),

	bannerImageUri: z
		.any()
		.optional()
		.refine((files) => files === undefined || files instanceof FileList,
			{ message: "Invalid file type!" }),
};