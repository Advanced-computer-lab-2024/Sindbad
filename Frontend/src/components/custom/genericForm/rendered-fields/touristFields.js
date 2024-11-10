import { getCurrencyOptions } from "@/utilities/getCurrencyOptions";

export const tourist = {
  fields: [
    {
      name: "email",
      type: "text",
      label: "Email Address",
      required: true,
    },
    {
      name: "mobileNumber",
      type: "text",
      label: "Mobile Number",
      required: true,
    },
    {
      name: "nationality",
      type: "text",
      label: "Nationality",
      required: true,
    },
    {
      name: "job",
      type: "text",
      label: "Job",
      required: true,
    },
    {
      name: "profileImageUri",
      type: "text",
      label: "Profile Image",
      required: true,
    },
    {
      name: "bannerImageUri",
      type: "text",
      label: "Banner Image",
      required: true,
    },
    {
      name: "preferredCurrency",
      type: "select",
      label: "Preferred Currency",
      required: true,
      options: await getCurrencyOptions(),
    }
  ],
  defaultValues: {
    email: "",
    mobileNumber: "",
    nationality: "",
    job: "",
    profileImageUri: "",
    bannerImageUri: "",
    preferredCurrency: "",
  },
};