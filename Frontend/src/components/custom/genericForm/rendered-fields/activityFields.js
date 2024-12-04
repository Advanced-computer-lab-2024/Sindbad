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
            type: "number",
            label: "Price",
            required: true,
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
            label: "Discount",
            description: "Discount value that will automatically be applied to the price of the activity",
            required: true,
            min: 0,
            max: 100,
        },
        {
            name: "isBookingOpen",
            type: "checkbox",
            label: "This activity is currently open for booking",
        }
    ],
    defaultValues: {
        name: "",
        description: "",
        cardImage: undefined,
        dateTime: null,
        location: {
            address: "",
            coordinates: {
                lat: 0,
                lng: 0
            }
        },
        price: 0,
        category: "",
        tags: [],
        discounts: 0,
        isBookingOpen: false
    },
}