import { getCurrencyOptions } from "@/utilities/getCurrencyOptions";

export const tourGuide = {
    fields: [
        { name: "email", type: "text", label: "Email" },
        { name: "mobileNumber", type: "text", label: "Mobile Number" },
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
        mobileNumber: "",
        profileImageUri: "",
        bannerImageUri: "",
        preferredCurrency: "",
    },
};
