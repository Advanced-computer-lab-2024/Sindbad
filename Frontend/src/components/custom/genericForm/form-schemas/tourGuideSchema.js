import { z } from "zod";

export const tourGuideSchema = {
    email: z.string()
      .email({ message: "Invalid email address!" })
      .min(1, { message: "Email is required!" }),
    
  
    mobileNumber: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid mobile number!" })
        .min(1, { message: "Mobile number is required!" }),
    profileImageUri: z.string(),

    bannerImageUri: z.string(),
};