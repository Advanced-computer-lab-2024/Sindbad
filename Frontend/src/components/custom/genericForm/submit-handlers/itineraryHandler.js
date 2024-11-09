import { createItinerary, updateItinerary } from "@/services/ItineraryApiHandler";

export const itinerarySubmit = (values, id, data, navigate, dispatch) => {
	const formattedValues = {
		...values,
		availableDatesTimes: values.availableDatesTimes.map((dateTime) => ({
			...dateTime,
			dateTime: new Date(dateTime.dateTime),
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
};