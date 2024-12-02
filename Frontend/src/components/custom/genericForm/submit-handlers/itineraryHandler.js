import { createItinerary, updateItinerary } from "@/services/ItineraryApiHandler";

export const itinerarySubmit = (values, id, data, navigate, dispatch) => {
	const formData = new FormData();
	formData.append("name", values.name);
	formData.append("description", values.description);
	//parse activity ids from URLs
	const activities = values.activities.map((activity) => activity.split("/").pop());
	formData.append("activities", JSON.stringify(activities));
	formData.append("locations", JSON.stringify(values.locations));
	formData.append("timeline", JSON.stringify(values.timeline));
	formData.append("duration", values.duration);
	formData.append("languages", JSON.stringify(values.languages));
	formData.append("price", values.price);
	// map availableDatesTimes to object with dateTime key and headCount key with value 0
	const availableDatesTimes = values.availableDatesTimes.map((dateTime) => ({
		dateTime: dateTime,
		headCount: 0,
	}));
	formData.append("availableDatesTimes", JSON.stringify(availableDatesTimes));
	formData.append("accessibility", JSON.stringify(values.accessibility));
	formData.append("pickUpLocation", values.pickUpLocation);
	formData.append("dropOffLocation", values.dropOffLocation);

	if (values.cardImage && values.cardImage.length > 0) {
		formData.append("cardImage", values.cardImage[0]); // First file from FileList
	}

	for (var pair of formData.entries()) {
		console.log(pair[0] + ": " + pair[1]);
	}

	if (data) {
		updateItinerary(data._id, formData);
	} else {
		formData.append("creatorId", id);
		createItinerary(formData);
	}

	// const formattedValues = {
	// 	...values,
	// 	availableDatesTimes: values.availableDatesTimes.map((dateTime) => ({
	// 		...dateTime,
	// 		dateTime: new Date(dateTime.dateTime),
	// 	})),
	// };
	// if (data) {
	// 	updateItinerary(data._id, formattedValues);
	// } else {
	// 	const itineraryWithId = {
	// 		...formattedValues,
	// 		creatorId: id,
	// 	};
	// 	createItinerary(itineraryWithId);
	// }
};