import { getCurrencyOptions } from "@/utilities/getCurrencyOptions";

export const advertiser = {
  fields: [
    { name: "email", type: "text", label: "Email" },
    { name: "websiteLink", type: "text", label: "Website Link" },
    { name: "hotline", type: "text", label: "Hotline" },
    {
      name: "logoImageUri",
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
    },
  ],
  defaultValues: {
    email: "",
    websiteLink: "",
    hotline: "",
    bannerImageUri: "",
    logoImageUri: "",
    preferredCurrency: "",
  },
};
