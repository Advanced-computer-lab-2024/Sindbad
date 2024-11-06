import { z } from "zod";

export const complaintSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
    body: z.string().min(1, {
        message: "Body is required",
    }),
    
})