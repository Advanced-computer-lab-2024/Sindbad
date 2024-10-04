import { z } from "zod";

const TouristSchema = {
    email: z.string()
      .email({ message: "Invalid email address!" })
      .min(1, { message: "Email is required!" }),
    
    mobileNumber: z.string()
      .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid mobile number!" })
      .min(1, { message: "Mobile number is required!" }),
    
    nationality: z.string()
      .min(1, { message: "Nationality is required!" }),
  
    DOB: z.string({}).min(1, { message: "Date of birth is required!" }),
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
  
  username: z.string()
    .min(1, { message: "Username is required!" }),

  mobileNumber: z.string()
  .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid mobile number!" })
  .min(1, { message: "Mobile number is required!" }),

  yearsOfExperience: z.number().optional(),
}

const SellerSchema = {
  email: z.string()
    .email({ message: "Invalid email address!" })
    .min(1, { message: "Email is required!" }),

  username: z.string()
    .min(1, { message: "Username is required!" }),

  firstName: z.string().optional(),

  lastName: z.string().optional(),

  description: z.string().optional(),
}

const AdvertiserSchema = {
  email: z.string()
    .email({ message: "Invalid email address!" })
    .min(1, { message: "Email is required!" }),

  username: z.string()
    .min(1, { message: "Username is required!" }),

  websiteLink: z.string(),

  mobileNumber: z.string()
  .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid mobile number!" })
  .min(1, { message: "Mobile number is required!" }),
}

const itinerarySchema = {
  name: z.string().min(1, { message: "Please add the name of the itinerary" }),

  activities: z.array(z.string().min(1, { message: "Activity ID must be provided" }))
    .min(1, { message: "Please add at least one activity" }),

  locations: z.array(z.string().min(1, { message: "Location must be provided" }))
    .min(1, { message: "Please add the locations of the itinerary" }),

  timeline: z.array(z.string().min(1, { message: "Timeline must be provided" }))
    .min(1, { message: "Please add the timeline of the itinerary" }),

  duration: z.number().min(0, { message: "Please specify a valid duration" }),

  languages: z.array(z.string().min(1, { message: "Language must be provided" }))
    .min(1, { message: "Please add the supported languages" }),

  price:  z.union([
    z.number().min(0, { message: "Price must be a non-negative number" }),
    z.object({
      min: z.number().min(0, { message: "Min price must be non-negative" }),
      max: z.number().min(0, { message: "Max price must be non-negative" }),
    }).refine(
      (data) => data.max >= data.min,
      { message: "Max price must be greater than or equal to min price" }
    ),
  ]),

  availableDatesTimes: z.array(z.date())
    .min(1, { message: "Please add at least one available date and time" }),

  accessibility: z.array(z.string().min(1, { message: "Accessibility option must be provided" }))
    .min(1, { message: "Please specify accessibility options" }),

  pickUpLocation: z.string().min(1, { message: "Please add the pick-up location" }),

  dropOffLocation: z.string().min(1, { message: "Please add the drop-off location" }),

  creatorId: z.string().min(1, { message: "Please add the creator of the itinerary" }),

  headCount: z.number().min(0).default(0),

  rating: z.number().min(0).default(0),
};
const productSchema = {
  name: z.string()
    .min(1, { message: "Please add the product name" }),

  picture: z.string()
    .url({ message: "Please add a valid product picture URL" })
    .min(1, { message: "Please add a product picture URL" }),

  price: z.number()
    .min(0, { message: "Price must be a non-negative number" }),

  description: z.string()
    .min(1, { message: "Please add a product description" }),

  seller: z.string()
    .min(1, { message: "Please add the seller of the product" }),

  rating: z.number()
    .min(0, { message: "Rating must be between 0 and 5" })
    .max(5, { message: "Rating must be between 0 and 5" })
    .default(0),

  reviews: z.array(z.string()).optional(),

  quantity: z.number()
    .min(0, { message: "Quantity must be a non-negative number" }),

  numSales: z.number()
    .min(0, { message: "Number of sales must be non-negative" })
    .default(0),

  isArchived: z.boolean().default(false),
}
const activitySchema = {
  name: z.string()
    .min(1, { message: "Please add the name of the activity" }),

  dateTime: z.date({ 
    required_error: "Please add the date of the activity" 
  }),

  location: z.string()
    .min(1, { message: "Please add the location of the activity" }),

  price: z.union([
    z.number().min(0, { message: "Fixed price must be non-negative" }),
    z.object({
      min: z.number().min(0, { message: "Price range min must be non-negative" }),
      max: z.number().min(0).refine((val, ctx) => {
        if (val < ctx.parent.min) {
          return false;
        }
        return true;
      }, { message: "Price range max must be greater than or equal to min" }),
    }),
  ]).refine(
    value => typeof value === "number" || (value.min <= value.max),
    { message: "Price must be either a non-negative number or a valid price range" }
  ),

  category: z.string()
    .min(1, { message: "Please add the category of the activity" }),

  tags: z.array(z.string())
    .nonempty({ message: "Please add the tags of the activity" })
    .max(10, { message: "You can only add up to 10 tags." }),

  discounts: z.number()
    .min(0, { message: "Discount must be between 0 and 100" })
    .max(100, { message: "Discount must be between 0 and 100" })
    .optional(),

  isBookingOpen: z.boolean().default(true),

  creatorId: z.string().optional(),

  headCount: z.number()
    .min(0, { message: "Head count must be non-negative" })
    .default(0),

  rating: z.number()
    .min(0, { message: "Rating must be non-negative" })
    .default(0),
};

const SiteSchema = {
  name: z.string().min(1, { message: "Please add a name for your site" }),
  description: z.string().min(1, { message: "Please add a description for your site" }),
  imageUris: z.array(z.string().url({ message: "Image must be a valid URL" })).min(1, { message: "Please add an image for your site" }),
  location: z.object({
    address: z.string().min(1, { message: "Address is required" }),
    coordinates: z.object({
      lat: z.number().min(-90).max(90, { message: "Latitude must be between -90 and 90" }),
      long: z.number().min(-180).max(180, { message: "Longitude must be between -180 and 180" }),
    }),
  }),
  openingHours: z.record(z.string(),
    z.object({
      start: z.number().min(0).max(1440, { message: "Start time must be within a valid range (0-1440 minutes)" }),
      end: z.number()
        .min(0)
        .max(1440)
        .refine((end, ctx) => end > ctx.parent.start, { message: "End time must be greater than start time" }),
    })
  ).min(1, { message: "Please add opening hours for each day" }),
    ticketPrices: z.array(z.number().min(0, { message: "Ticket prices must be non-negative" })),
    tags: z.array(z.string().min(1, { message: "Tag must be valid ObjectId string" })),
    creatorId: z.string().min(1, { message: "Creator ID is required" }),
  };

const formMap = {
    tourist: TouristSchema,
    tourGuide: TourGuideSchema,
    seller: SellerSchema,
    advertiser: AdvertiserSchema,
    itinerary: itinerarySchema,
    product: productSchema,
    activity: activitySchema,
    site: SiteSchema,
}

export default formMap;