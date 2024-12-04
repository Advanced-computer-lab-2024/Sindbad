import { createActivity, updateActivity } from "@/services/ActivityApiHandler";
import { Convert } from "easy-currencies";

export const activitySubmit = async (values, id, data, navigate, dispatch, currency) => {
	console.log(values)
	const formData = new FormData();
	formData.append("name", values.name);
	formData.append("description", values.description);
	formData.append("dateTime", values.dateTime);
	formData.append("location", JSON.stringify(values.location));
	// convert price to USD
	const converter = await Convert().from("USD").fetch();
	const convertedPrice = values.price / converter.rates[currency];
	formData.append("price", convertedPrice);
	formData.append("category", values.category);
	formData.append("tags", JSON.stringify(values.tags));
	formData.append("discounts", values.discounts);
	formData.append("isBookingOpen", values.isBookingOpen);

	if (values.cardImage && values.cardImage.length > 0) {
		formData.append("cardImage", values.cardImage[0]);
	}

	for (var pair of formData.entries()) {
		console.log(pair[0] + ": " + pair[1]);
	}

	if(data) {
		const activityId = data._id;
		updateActivity(activityId, formData);
	} else {
		formData.append("creatorId", id);
		createActivity(formData);
	}
};