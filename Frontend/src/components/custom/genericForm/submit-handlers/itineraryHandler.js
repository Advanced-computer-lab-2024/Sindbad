import { createItinerary, updateItinerary } from "@/services/ItineraryApiHandler";

export const itinerarySubmit = (values, id, data) => {
    const formattedValues = {
        ...values,
        availableDatesTimes: values.availableDatesTimes.map(dateTime => ({
            dateTime: new Date(dateTime),
            headCount: 0,
        })),
    };

    if (data) {
        updateItinerary(data._id, formattedValues);
    } else {
        const itineraryWithId = {
            ...formattedValues,
            creatorId: id,
        };
        createItinerary(itineraryWithId);
    }
}