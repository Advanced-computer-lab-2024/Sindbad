import { z } from "zod";
export const previousWorkSchema = {
	jobTitle: z.string(),
	companyName: z.string(),
	duration: z.string(),
	description: z.string(),
};