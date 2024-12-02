import { getCurrencyOptions } from "@/utilities/getCurrencyOptions";

export const seller = {
    fields: [
        { name: "email", type: "text", label: "Email" },
        { name: "firstName", type: "text", label: "First Name" },
        { name: "lastName", type: "text", label: "Last Name" },
        { name: "description", type: "text", label: "Description" },
        {
            name: "profileImageUri",
            type: "file",
            label: "Profile Image",
            required: true,
        },
        {
            name: "bannerImageUri",
            type: "file",
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
        firstName: "",
        lastName: "",
        description: "",
        profileImageUri: "",
        bannerImageUri: "",
        preferredCurrency: "",
    },
};
