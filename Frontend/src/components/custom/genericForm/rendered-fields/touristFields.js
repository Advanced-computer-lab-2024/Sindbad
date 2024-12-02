import { getCurrencyOptions } from "@/utilities/getCurrencyOptions";
import { nationalities } from "@/utilities/getNationalities";

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
            type: "select",
            label: "Nationality",
            options: nationalities.map((nationality) => (nationality.label)),
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
        nationality: "",
        job: "",
        profileImageUri: undefined,
        bannerImageUri: undefined,
        preferredCurrency: "",
    },
};