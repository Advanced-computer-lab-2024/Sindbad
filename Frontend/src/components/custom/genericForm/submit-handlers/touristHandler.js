import { updateTourist } from "@/services/TouristApiHandler";
import { setCurrency } from "@/state management/userInfo";

export const touristSubmit = (values, id, navigate, dispatch) => {
	dispatch(setCurrency(values.preferredCurrency));

	const formData = new FormData();
	formData.append("email", values.email);
	formData.append("mobileNumber", values.mobileNumber);
	formData.append("nationality", values.nationality);
	formData.append("job", values.job);
	formData.append("preferredCurrency", values.preferredCurrency);

	if (values.profileImageUri && values.profileImageUri.length > 0) {
		formData.append("profileImageUri", values.profileImageUri[0]); // First file from FileList
	}

	if (values.bannerImageUri && values.bannerImageUri.length > 0) {
		formData.append("bannerImageUri", values.bannerImageUri[0]); // First file from FileList
	}

	for (let pair of formData.entries()) {
		console.log(pair[0] + ": ", pair[1]);
	}

	return updateTourist(id, formData);
};