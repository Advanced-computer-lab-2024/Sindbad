import { z } from "zod";

// Schema for location
const locationSchema = z.object({
	address: z.string().nonempty("Address is required"),
	coordinates: z.object({
		lat: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
		lng: z
			.number()
			.min(-180)
			.max(180, "Longitude must be between -180 and 180"),
	}),
});

const TouristSchema = {
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

const TourGuideSchema = {
  email: z.string()
    .email({ message: "Invalid email address!" })
    .min(1, { message: "Email is required!" }),
  

	mobileNumber: z
		.string()
		.regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid mobile number!" })
		.min(1, { message: "Mobile number is required!" }),
};

const SellerSchema = {
	email: z
		.string()
		.email({ message: "Invalid email address!" })
		.min(1, { message: "Email is required!" }),


	firstName: z.string().optional(),

	lastName: z.string().optional(),

	description: z.string().optional(),
};

const AdvertiserSchema = {
	email: z
		.string()
		.email({ message: "Invalid email address!" })
		.min(1, { message: "Email is required!" }),

  websiteLink: z.string(),

	hotline: z
		.string()
		.regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid mobile number!" })
		.min(1, { message: "Mobile number is required!" }),
};

const itinerarySchema = {
	name: z.string().min(1, { message: "Please add the name of the itinerary" }),

	activities: z
		.array(z.string().min(1, { message: "Activity ID must be provided" }))
		.min(1, { message: "Please add at least one activity" }),

	locations: z
		.array(z.string().min(1, { message: "Location must be provided" }))
		.min(1, { message: "Please add the locations of the itinerary" }),

	timeline: z
		.array(z.string().min(1, { message: "Timeline must be provided" }))
		.min(1, { message: "Please add the timeline of the itinerary" }),

	duration: z.number().min(0, { message: "Please specify a valid duration" }),

	languages: z
		.array(z.string().min(1, { message: "Language must be provided" }))
		.min(1, { message: "Please add the supported languages" }),

	price: z.number().min(0, { message: "Price must be a non-negative number" }),

	availableDatesTimes: z.array(z.string()),

	accessibility: z
		.array(
			z.string().min(1, { message: "Accessibility option must be provided" })
		)
		.min(1, { message: "Please specify accessibility options" }),

	pickUpLocation: z
		.string()
		.min(1, { message: "Please add the pick-up location" }),

  dropOffLocation: z.string().min(1, { message: "Please add the drop-off location" }),

};
const productSchema = {
	name: z.string().min(1, { message: "Please add the product name" }),

	picture: z
		.string()
		.url({ message: "Please add a valid product picture URL" })
		.min(1, { message: "Please add a product picture URL" }),

	price: z.number().min(0, { message: "Price must be a non-negative number" }),

	description: z
		.string()
		.min(1, { message: "Please add a product description" }),

	quantity: z
		.number()
		.min(0, { message: "Quantity must be a non-negative number" }),

	isArchived: z.boolean(),
};
const activitySchema = {
	name: z.string().min(1, { message: "Please add the name of the activity" }),

	dateTime: z
		.string({
			required_error: "Please add the date of the activity",
		})
		.refine((val) => !isNaN(Date.parse(val)), {
			message: "Invalid date",
		}),

	location: locationSchema,

	price: z.number().min(0, { message: "Price must be a non-negative number" }),

	category: z
		.string()
		.min(1, { message: "Please add the category of the activity" }),

	tags: z
		.array(z.string())
		.max(10, { message: "You can only add up to 10 tags." }),

	discounts: z
		.number()
		.min(0, { message: "Discount must be between 0 and 100" })
		.max(100, { message: "Discount must be between 0 and 100" }),

    isBookingOpen: z.boolean(),
};

// Schema for opening hours per day
const openingHoursSchema = z.object({
	start: z
		.number()
		.min(0, "Start time must be a positive number")
		.max(1440, "Start time must be within a 24-hour range"),
	end: z
		.number()
		.min(0, "End time must be a positive number")
		.max(1440, "End time must be within a 24-hour range"),
});

// Days of the week as keys
const daysOfWeek = z.object({
	monday: openingHoursSchema,
	tuesday: openingHoursSchema,
	wednesday: openingHoursSchema,
	thursday: openingHoursSchema,
	friday: openingHoursSchema,
	saturday: openingHoursSchema,
	sunday: openingHoursSchema,
});

// Ticket prices schema
const ticketPricesSchema = z.object({
	child: z.number().min(0, "Child ticket price must be non-negative"),
	student: z.number().min(0, "Student ticket price must be non-negative"),
	adult: z.number().min(0, "Adult ticket price must be non-negative"),
	foreigner: z.number().min(0, "Foreigner ticket price must be non-negative"),
});

// Site schema
const siteSchema = {
	name: z.string().min(1, "Please add a name for your site"),
	description: z.string().nonempty("Please add a description for your site"),
	imageUris: z
		.array(z.string().url("Invalid image URL"))
		.nonempty("Please add at least one image URL"),
	location: locationSchema,
	openingHours: daysOfWeek, // Opening hours per day of the week
	ticketPrices: ticketPricesSchema, // Explicit keys for ticket categories
	tags: z.array(z.string().nonempty()), // assuming ObjectId can be represented as a string
	creatorId: z.string().nonempty("Creator ID is required"), // Assuming creatorId can be treated as a string
};

const companyProfileSchema = {
	name: z.string().min(1, { message: "Company name is required." }),
	description: z
		.string()
		.max(500, { message: "Description cannot be longer than 500 characters." }),
	location: z.string(),
};
const PreviousWorkSchema = {
	jobTitle: z.string(),
	companyName: z.string(),
	duration: z.string(),
	description: z.string(),
};

const formMap = {
	tourist: TouristSchema,
	tourGuide: TourGuideSchema,
	seller: SellerSchema,
	advertiser: AdvertiserSchema,
	itinerary: itinerarySchema,
	product: productSchema,
	activity: activitySchema,
	site: siteSchema,
	company: companyProfileSchema,
	experience: PreviousWorkSchema,
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
