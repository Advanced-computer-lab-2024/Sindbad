import { z } from "zod";
import { locationSchema } from "./locationSchema";

export const tripSchema = {
  name: z.string().min(1, { message: "Please add the name of the activity" }),

  description: z.string(),

  dateTime: z
    .string({
      required_error: "Please add the date of the activity",
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date",
    }),

  pickupLocation: locationSchema,
  dropoffLocation: locationSchema,

  imageUris: z
    .array(z.string().url("Invalid image URL"))
    .nonempty("Please add at least one image URL"),

  price: z.number(),

  discount: z
    .number()
    .min(0, { message: "Discount must be between 0 and 100" })
    .max(100, { message: "Discount must be between 0 and 100" }),

  isBookingOpen: z.boolean(),

  capacity: z.number(),
};
