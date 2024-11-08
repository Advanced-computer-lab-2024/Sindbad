import { z } from "zod";

export const tourismGovernorSchema = {
	email: z
		.string()
		.email({ message: "Invalid email address!" })
		.min(1, { message: "Email is required!" }),
		
	profileImageUri: z.string(),

	bannerImageUri: z.string(),
};