import { z } from "zod";

export const hotelBookingSchema = {
	guests: z
		.array(
			z.object({
				title: z.string().min(1, { message: "Title is required" }),
				firstName: z.string().min(1, { message: "First name is required" }),
				lastName: z.string().min(1, { message: "Last name is required" }),
				phone: z.string().min(2, { message: "Phone number is required" }),
				email: z.string().email({ message: "Invalid email address" }),
			})
		)
		.min(1, { message: "At least one guest is required" }),

	payment: z.object({
		method: z.string().min(1, { message: "Payment method is required" }),

		paymentCard: z.object({
			paymentCardInfo: z.object({
				vendorCode: z.string().min(1, { message: "Vendor code is required" }),
				cardNumber: z.string().min(1, { message: "Card number is required" }),
				expiryDate: z.string().min(1, { message: "Expiry date is required" }),
				holderName: z
					.string()
					.min(1, { message: "Card holder name is required" }),
			}),
		}),
	}),
};
