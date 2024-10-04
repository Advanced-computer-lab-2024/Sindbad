import { getTourGuide } from "@/services/TourGuideApiHandler";
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

const formMap = {
    tourist: TouristSchema,
    tourGuide: TourGuideSchema,
    seller: SellerSchema,
    advertiser: AdvertiserSchema
}

export default formMap;