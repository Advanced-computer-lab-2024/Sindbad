export const seller = {
  fields: [
    { name: "email", type: "text", label: "Email" },
    { name: "firstName", type: "text", label: "First Name" },
    { name: "lastName", type: "text", label: "Last Name" },
    { name: "description", type: "text", label: "Description" },
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
    firstName: "",
    lastName: "",
    description: "",
    profileImageUri: "",
    bannerImageUri: "",
  },
};
