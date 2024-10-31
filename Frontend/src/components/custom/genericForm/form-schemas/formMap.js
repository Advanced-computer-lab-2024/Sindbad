import { z } from "zod";
import { touristSchema } from "@/components/custom/genericForm/form-schemas/touristSchema";
import { tourGuideSchema } from "@/components/custom/genericForm/form-schemas/tourGuideSchema";
import { sellerSchema } from "@/components/custom/genericForm/form-schemas/sellerSchema";
import { advertiserSchema } from "@/components/custom/genericForm/form-schemas/advertiserSchema";
import { itinerarySchema } from "@/components/custom/genericForm/form-schemas/itinerarySchema";
import { productSchema } from "@/components/custom/genericForm/form-schemas/productSchema";
import { activitySchema } from "@/components/custom/genericForm/form-schemas/activitySchema";
import { siteSchema } from "@/components/custom/genericForm/form-schemas/siteSchema";
import { companyProfileSchema } from "@/components/custom/genericForm/form-schemas/companyProfileSchema";
import { previousWorkSchema } from "@/components/custom/genericForm/form-schemas/previousWorkSchema";


const formMap = {
	tourist: touristSchema,
	tourGuide: tourGuideSchema,
	seller: sellerSchema,
	advertiser: advertiserSchema,
	itinerary: itinerarySchema,
	product: productSchema,
	activity: activitySchema,
	site: siteSchema,
	company: companyProfileSchema,
	experience: previousWorkSchema,
};

export const parseZodSchema = (schema) => {
	if (schema instanceof z.ZodObject) {
		const shape = schema.shape;
		const parsed = {};
		for (const key in shape) {
			parsed[key] = parseZodSchema(shape[key]);
		}
		return parsed;
	}

	if (schema instanceof z.ZodArray) {
		// Return an array of empty objects based on the inner schema
		return [parseZodSchema(schema.element)];
	}

	// Check for specific primitive types and return corresponding values
	if (schema instanceof z.ZodString) {
		return "string"; // For strings, return an empty string
	}

	if (schema instanceof z.ZodNumber) {
		return 1; // For numbers, return 0
	}

	if (schema instanceof z.ZodBoolean) {
		return false; // For booleans, return false
	}
	if (schema instanceof z.ZodDate) {
		return "date"; // For dates, return the current date
	}
	// Default return value for any other types not explicitly handled
	return "";
};

export default formMap;
