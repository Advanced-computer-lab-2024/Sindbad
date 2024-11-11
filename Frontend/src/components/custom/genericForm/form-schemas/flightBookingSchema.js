import { z } from "zod";

export const flightBookingSchema = {
  firstName: z.string().min(1, { message: "First name must be provided" }),
  lastName: z.string().min(1, { message: "Last name must be provided" }),
  gender: z.string().min(1, { message: "Gender must be provided" }),
  email: z.string().email({ message: "Invalid email address" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth must be provided" }),
  countryCallingCode: z
    .string()
    .min(1, { message: "Country calling code must be provided" }),
  phoneNumber: z.string().min(2, { message: "Phone number must be provided" }),
  birthPlace: z.string().min(1, { message: "Birth place must be provided" }),
  passportIssuanceLocation: z
    .string()
    .min(1, { message: "Passport location must be provided" }),
  passportIssuanceDate: z
    .string()
    .min(1, { message: "Passport issuance date must be provided" }),
  passportNumber: z
    .string()
    .min(1, { message: "Passport number must be provided" }),
  passportExpiryDate: z
    .string()
    .min(1, { message: "Passport expiry date must be provided" }),
  passportIssuanceCountry: z
    .string()
    .min(1, { message: "Passport issuance country must be provided" })
    .regex(/^[a-zA-Z]{2}$/, {
      message:
        "Please enter ISO 3166-1 alpha-2 of the country that issued the document",
    }),
  nationality: z
    .string()
    .min(1, { message: "Nationality must be provided" })
    .regex(/^[a-zA-Z]{2}$/, {
      message:
        "Please enter ISO 3166-1 alpha-2 of your country",
    }),
};