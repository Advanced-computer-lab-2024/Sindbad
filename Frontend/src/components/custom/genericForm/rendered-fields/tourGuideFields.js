export const tourGuide = {
  fields: [
    { name: "email", type: "text", label: "Email" },
    { name: "mobileNumber", type: "text", label: "Mobile Number" },
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
  ],
  defaultValues: {
    email: "",
    mobileNumber: "",
    profileImageUri: "",
    bannerImageUri: "",
  },
};
