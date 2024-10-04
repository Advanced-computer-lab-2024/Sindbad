import { getTourGuide } from "@/services/ApiHandler";
import { z } from "zod";

const TouristSchema = {
    email: z.string()
      .email({ message: "Invalid email address!" })
      .min(1, { message: "Email is required!" }),
    
    passwordHash: z.string()
      .min(1, { message: "Password is required!" }),
    
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
  
    addresses: z.array(
      z.object({
        label: z.string().min(1, { message: "Label is required!" }),
        street: z.string().min(1, { message: "Street is required!" }),
        city: z.string().min(1, { message: "City is required!" }),
        state: z.string().min(1, { message: "State is required!" }),
        zip: z.string().min(1, { message: "Zip code is required!" }),
        country: z.string().min(1, { message: "Country is required!" }),
      })
    ).default([]),
};

const TourGuideSchema = z.object({
  email: z.string()
    .email({ message: "Invalid email address!" })
    .min(1, { message: "Email is required!" }),
  
  username: z.string()
    .min(1, { message: "Username is required!" }),

  passwordHash: z.string()
    .min(1, { message: "Password is required!" }),

  mobileNumber: z.string()
    .optional()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid mobile number!" })
    .nullable()
    .or(z.string().min(0)),

  yearsOfExperience: z.number().optional(),

  previousWork: z.array(
    z.object({
      jobTitle: z.string().optional(),
      companyName: z.string().optional(),
      duration: z.string().optional(),
      description: z.string().optional().default(""),
    })
  ).default([]),

  isAccepted: z.boolean().optional(),
});

import { z } from "zod";

const SellerSchema = z.object({
  email: z.string()
    .email({ message: "Invalid email address!" })
    .min(1, { message: "Email is required!" }),

  username: z.string()
    .min(1, { message: "Username is required!" }),

  passwordHash: z.string()
    .min(1, { message: "Password is required!" }),

  firstName: z.string().optional(),

  lastName: z.string().optional(),

  description: z.string().optional(),

  isAccepted: z.boolean().default(false),

  products: z.array(z.object({})).optional(),
});

import { z } from "zod";

const AdvertiserSchema = z.object({
  email: z.string()
    .email({ message: "Invalid email address!" })
    .min(1, { message: "Email is required!" }),

  username: z.string()
    .min(1, { message: "Username is required!" }),

  passwordHash: z.string()
    .min(1, { message: "Password is required!" }),

  websiteLink: z.string()
    .optional()
    .regex(/^(www\.)[\da-z.-]+\.[a-z.]{2,6}(\/[\w .-]*)*\/?$/, {
      message: "Invalid website URL! Website must start with 'www.'",
    }),

  hotline: z.string()
    .optional()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid hotline number!" }),

  companyProfile: z.object({
    name: z.string()
      .min(1, { message: "Company name is required." }),

    description: z.string()
      .max(500, { message: "Description cannot be longer than 500 characters." })
      .optional(),

    location: z.string().optional(),
  }),

  isAccepted: z.boolean().default(false),

  createdActivities: z.array(z.string()).default([]),

  createdIterinaries: z.array(z.string()).default([]),

  createdHistoricalPlaces: z.array(z.string()).default([]),
});

const formMap = {
    tourist: TouristSchema,
    tourGuide: TourGuideSchema,
    seller: SellerSchema,
    advertiser: AdvertiserSchema
}

export default formMap;