export const flightSearchFields = {
    fields: [
        {
            name: 'origin',
            type: 'text',
            label: 'Origin',
            required: true,
        },
        {
            name: "destination",
            type: "text",
            label: "Destination",
            required: true,
        },
        {
            name: "date",
            type: "text",
            label: "Date",
            required: true,
        },
        {
            name: "adults",
            type: "number",
            label: "Adults",
            required: true,
        },
    ],
    defaultValues: {
        origin: '',
        destination: '',
        date: '',
        adults: 0,
    }
};