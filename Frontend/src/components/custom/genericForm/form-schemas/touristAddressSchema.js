import { z } from "zod";

export const touristAddressSchema = {
    label: z.string().min(1, { message: "Label is required!" }),
    street: z.string().min(1, { message: "Street is required!" }),
    city: z.string().min(1, { message: "City is required!" }),
    state: z.string().min(1, { message: "State is required!" }),
    zip: z.string().min(1, { message: "Zip code is required!" }),
    country: z.string().min(1, { message: "Country is required!" }),
};