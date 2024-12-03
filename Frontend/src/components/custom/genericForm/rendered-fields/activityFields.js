import { getCategories, getTags } from "@/utilities/getTagsAndCategories";

export const activity = {
    fields: [
        {
            name: "name",
            type: "text",
            label: "Activity Name",
            required: true,
        },
        {
            name: "description",
            type: "textArea",
            label: "Description",
            required: true,
        },
        {
            name: "cardImage",
            type: "file",
            label: "Photo",
        },
        {
            name: "dateTime",
            type: "date",
            label: "Date & Time",
            required: true,
        },
        {
            name: "location",
            type: "object",
            label: "Location",
            required: true,
            fields: [
                {
                    name: "address",
                    type: "text",
                    label: "Address",
                    required: true,
                },
                {
                    name: "coordinates",
                    type: "coordinates",
                    label: "Coordinates",
                    required: true,
                }
            ]
        },
        {
            name: "price",
            type: "object",
            label: "Price Range",
            required: true,
            fields: [
                {
                    name: "min",
                    type: "number",
                    label: "Minimum Price",
                    required: true,
                },
                {
                    name: "max",
                    type: "number",
                    label: "Maximum Price",
                    required: true,
                }
            ]
        },
        {
            name: "category",
            type: "select",
            label: "Category",
            options: await getCategories(),
            required: true,
        },
        {
            name: "tags",
            type: "multiSelect",
            label: "Tags",
            options: await getTags(),
            maxItems: 10,
            itemType: "text",
        },
        {
            name: "discounts",
            type: "number",
            label: "Discount Percentage",
            required: true,
            min: 0,
            max: 100,
        },
        {
            name: "isBookingOpen",
            type: "checkbox",
            label: "Booking Status",
        }
    ],
    defaultValues: {
        name: "",
        dateTime: "",
        location: {
            address: "",
            coordinates: {
                lat: 0,
                lng: 0
            }
        },
        price: {
            min: 0,
            max: 0
        },
        category: "",
        tags: [],
        discounts: 0,
        isBookingOpen: false
    },
}