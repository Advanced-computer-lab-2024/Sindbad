import { z } from "zod";

export const touristSchema = {
    email: z.string()
        .email({ message: "Invalid email address!" })
        .min(1, { message: "Email is required!" }),

    mobileNumber: z.string()
        .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid mobile number!" })
        .min(1, { message: "Mobile number is required!" }),

    nationality: z.string()
        .min(1, { message: "Nationality is required!" }),

    //   required_error: "Date of birth is required!",
    //   invalid_type_error: "Invalid date format!",
    // }),

    job: z.string()
        .min(1, { message: "Job is required!" }),

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

    // addresses: z.array(
    //   z.object({
    //     label: z.string().min(1, { message: "Label is required!" }),
    //     street: z.string().min(1, { message: "Street is required!" }),
    //     city: z.string().min(1, { message: "City is required!" }),
    //     state: z.string().min(1, { message: "State is required!" }),
    //     zip: z.string().min(1, { message: "Zip code is required!" }),
    //     country: z.string().min(1, { message: "Country is required!" }),
    //   })
    // ).default([]),
};