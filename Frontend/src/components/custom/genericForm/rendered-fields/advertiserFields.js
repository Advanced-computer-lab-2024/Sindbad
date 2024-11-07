export const advertiser = {
  fields: [
    { name: "email", type: "text", label: "Email" },
    { name: "websiteLink", type: "text", label: "Website Link" },
    { name: "hotline", type: "text", label: "Hotline" },
    {
      name: "bannerImageUri",
      type: "text",
      label: "Banner Image",
      required: true,
    },
    {
      name: "logoImageUri",
      type: "text",
      label: "Logo Image",
      required: true,
    },
  ],
  defaultValues: {
    email: "",
    websiteLink: "",
    hotline: "",
    bannerImageUri: "",
    logoImageUri: "",
  },
};
