export const trip = {
  fields: [
    {
      name: "name",
      type: "text",
      label: "Transportation Name",
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
      required: true,
    },
    {
      name: "dateTime",
      type: "date",
      label: "Date & Time",
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
      name: "price",
      type: "number",
      label: "Price",
      required: true,
    },
    {
      name: "capacity",
      type: "number",
      label: "Capacity",
    },
  ],
  defaultValues: {
    name: "",
    description: "",
    cardImage: undefined,
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
    price: 0,
    capacity: 0,
  },
};
