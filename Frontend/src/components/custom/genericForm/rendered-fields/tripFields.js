export const trip = {
  fields: [
    {
      name: "name",
      type: "text",
      label: "Trip Name",
      required: true,
    },
    {
      name: "description",
      type: "text",
      label: "Description",
      required: true,
    },
    {
      name: "dateTime",
      type: "date",
      label: "Date and Time",
      required: true,
    },
    {
      name: "pickupLocation",
      type: "object",
      label: "Pickup Location",
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
        },
      ],
    },
    {
      name: "dropoffLocation",
      type: "object",
      label: "Dropoff Location",
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
        },
      ],
    },
    {
      name: "imageUris",
      type: "array",
      label: "Image URLs",
      required: true,
    },
    {
      name: "price",
      type: "number",
      label: "Price",
      required: true,
    },
    {
      name: "discount",
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
    },
    {
      name: "capacity",
      type: "number",
      label: "Capacity",
    },
  ],
  defaultValues: {
    name: "",
    dateTime: "",
    pickupLocation: {
      address: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
    },
    dropoffLocation: {
      address: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
    },
    description: "",
    price: 0,
    discount: 0,
    isBookingOpen: false,
    imageUris: "",
    capacity: 0,
  },
};
