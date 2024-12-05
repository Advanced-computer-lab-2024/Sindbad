import { z } from "zod";
import { locationSchema } from "./locationSchema";

export const tripSchema = {
    name: z.string().min(1, { message: "Please add the name of the transportation offer" }),

    description: z.string().min(1, { message: "Please add a description of the transportation offer" }),

    cardImage: z
        .any()
        .refine(
            (files) =>
                files === undefined ||
                (files instanceof FileList && Array.from(files).every(file => ['image/png', 'image/jpeg'].includes(file.type))),
            { message: "Image must be a PNG or JPG file" }
        ),

    dateTime: z.date()
        .refine(
            (date) => date > new Date(),
            { message: "Date must be in the future" }
        ),

    pickupLocation: locationSchema,
    dropoffLocation: locationSchema,

    price: z.number().min(0, { message: "Price must be a non-negative number" }),

    capacity: z.number().min(0, { message: "Capacity must be a non-negative number" }),
};
