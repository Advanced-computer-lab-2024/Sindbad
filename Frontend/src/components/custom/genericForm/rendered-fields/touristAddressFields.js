import { getCurrencyOptions } from "@/utilities/getCurrencyOptions";

export const touristAddress = {
  fields: [
    {
      name: "label",
      type: "text",
      label: "Label",
    },
    {
      name: "street",
      type: "text",
      label: "Street",
    },
    {
      name: "city",
      type: "text",
      label: "City",
    },
    {
      name: "state",
      type: "text",
      label: "State",
    },
    {
      name: "zip",
      type: "text",
      label: "Zip",
    },
    {
      name: "country",
      type: "text",
      label: "Country",
    },
  ],
  defaultValues: {
    label: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  },
};