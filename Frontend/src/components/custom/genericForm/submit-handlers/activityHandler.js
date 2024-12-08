import { createActivity, updateActivity } from "@/services/ActivityApiHandler";
import { Convert } from "easy-currencies";

export const activitySubmit = async (values, id, data, navigate, dispatch, currency, toast) => {
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

	// if(data) {
	// 	const activityId = data._id;
	// 	updateActivity(activityId, formData);
	// } else {
	// 	formData.append("creatorId", id);
	// 	createActivity(formData);
	// }

	try {
		let response;
		let desc;
		if (data) {
			const activityId = data._id;
			response = await updateActivity(activityId, formData);
			desc = "Activity updated successfully";
		} else {
			formData.append("creatorId", id);
			response = await createActivity(formData);
			desc = "Activity created successfully";
		}

		if (response && !response.error && navigate) {
			navigate("/app/profile");
			toast({description: desc});
		} else {
			throw new Error("API did not return a success response");
		}
	} catch (error) {
		console.error("Error submitting form:", error);
		toast({description: "Error submitting form"});
	}
};