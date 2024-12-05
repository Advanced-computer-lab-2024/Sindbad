import { updateTourismGovernor } from "@/services/TourismGovernorApiHandler";

export const tourismGovernorSubmit = (values, id, navigate, dispatch, currency) => {
	const formData = new FormData();

	formData.append("email", values.email);

	if (values.profileImageUri && values.profileImageUri.length > 0) {
		formData.append("profileImageUri", values.profileImageUri[0]);
	}

	if (values.bannerImageUri && values.bannerImageUri.length > 0) {
		formData.append("bannerImageUri", values.bannerImageUri[0]);
	}

	for (let pair of formData.entries()) {
		console.log(pair[0] + ": ", pair[1]);
	}

	return updateTourismGovernor(id, formData);
};