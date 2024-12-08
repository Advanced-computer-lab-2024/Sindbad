import { updateAdvertiser } from "@/services/AdvertiserApiHandler";

export const companySubmit = async (values, id, navigate, dispatch, currency, toast) => {
	let companyProfile = {};
	for (const key in values) {
		if (key === "name") {
			companyProfile.name = values[key];
		}
		if (key === "description") {
			companyProfile.description = values[key];
		}
		if (key === "location") {
			companyProfile.location = values[key];
		}
	}
	const body = {
		id: id,
		companyProfile: companyProfile,
	};

	// updateAdvertiser(body, id);

	try {
		let response = await updateAdvertiser(body, id);

		if (response && !response.error && navigate) {
			navigate("/app/profile");
			toast({description: "Company updated successfully"});
		} else {
			throw new Error("API did not return a success response");
		}
	} catch (error) {
		console.error("Error submitting form:", error);
		toast({description: "Error updating company"});
	}
};