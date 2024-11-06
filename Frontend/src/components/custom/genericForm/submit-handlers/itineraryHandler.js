import { createItinerary, updateItinerary } from "@/services/ItineraryApiHandler";

export const itinerarySubmit = (values, id, data) => {
    const formattedValues = {
        ...values,
        availableDatesTimes: values.availableDatesTimes.map(dateTime => ({
            ...dateTime,
            dateTime: new Date(dateTime.dateTime),
        })),
    };

    if (data) {
        console.log(data);
        console.log(formattedValues);
        updateItinerary(data._id, formattedValues);
    } else {
        const itineraryWithId = {
            ...formattedValues,
            creatorId: id,
        };
        createItinerary(itineraryWithId);
    }
}