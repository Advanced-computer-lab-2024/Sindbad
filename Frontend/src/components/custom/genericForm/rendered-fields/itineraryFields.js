export const itinerary = {
    fields: [
        { name: 'name', type: 'text', label: 'Itinerary Name' },
        { name: 'activities', type: 'multi-select', label: 'Activities' },
        { name: 'locations', type: 'multi-select', label: 'Locations' },
        { name: 'timeline', type: 'multi-select', label: 'Timeline' },
        { name: 'duration', type: 'number', label: 'Duration' },
        { name: 'languages', type: 'multi-select', label: 'Supported Languages' },
        { name: 'price', type: 'number', label: 'Price' },
        { name: 'pickUpLocation', type: 'text', label: 'Pick-up Location' },
        { name: 'dropOffLocation', type: 'text', label: 'Drop-off Location' }
    ],
    defaultValues: {
        name: '',
        activities: [],
        locations: [],
        timeline: [],
        duration: 0,
        languages: [],
        price: 0,
        pickUpLocation: '',
        dropOffLocation: ''
    }
};