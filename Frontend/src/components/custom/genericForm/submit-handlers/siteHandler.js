import { createSite, updateSite } from "@/services/SiteApiHandler";
import { Convert } from "easy-currencies";

export const siteSubmit = async (values, id, data, navigate, dispatch, currency, toast) => {
	console.log("VALUES: ", values);
	const formData = new FormData();
	formData.append("name", values.name);
	formData.append("description", values.description);
	formData.append("location", JSON.stringify(values.location));
	// convert openingHours to minutes offset from midnight
	const openingHours = {};
	for (const [key, value] of Object.entries(values.openingHours)) {
		const start = value.start.split(":");
		const end = value.end.split(":");
		openingHours[key] = {
			start: parseInt(start[0]) * 60 + parseInt(start[1]),
			end: parseInt(end[0]) * 60 + parseInt(end[1]),
		};
	}
	formData.append("openingHours", JSON.stringify(openingHours));
	// convert ticketPrices to USD
	const converter = await Convert().from("USD").fetch();
	const convertedPrices = {};
	for (const [key, price] of Object.entries(values.ticketPrices)) {
		convertedPrices[key] = price / converter.rates[currency];
	}
	formData.append("ticketPrices", JSON.stringify(convertedPrices));
	formData.append("tags", JSON.stringify(values.tags));

	if (values.cardImage && values.cardImage.length > 0) {
		formData.append("cardImage", values.cardImage[0]); // First file from FileList
	}

	for (var pair of formData.entries()) {
		console.log(pair[0] + ": " + pair[1]);
	}

	// if (data) {
	// 	updateSite(data._id, formData);
	// }
	// else {
	// 	formData.append("creatorId", id);
	// 	createSite(formData);
	// }

	try {
		let response;
		let desc;
		if (data) {
			response = await updateSite(data._id, formData);
			desc = "Site updated successfully";
		} else {
			formData.append("creatorId", id);
			response = await createSite(formData);
			desc = "Site created successfully";
		}

		if (response && !response.error && navigate) {
			navigate("/app/profile");
			toast({ description: desc });
		} else {
			throw new Error("API did not return a success response");
		}
	} catch (error) {
		console.error("Error submitting form:", error);
		toast({ description: "Error submitting form" });
	}
};