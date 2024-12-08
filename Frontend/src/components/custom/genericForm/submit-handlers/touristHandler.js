import { updateTourist } from "@/services/TouristApiHandler";
import { setCurrency } from "@/state management/userInfo";

export const touristSubmit = async (values, id, navigate, dispatch, currency, toast) => {
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

	// for (let pair of formData.entries()) {
	// 	console.log(pair[0] + ": ", pair[1]);
	// }

	// return updateTourist(id, formData);

	try {
		let response = await updateTourist(id, formData);

		if (response && !response.error && navigate) {
			navigate("/app/profile");
			toast({description: "Profile updated successfully"});
		} else {
			throw new Error("API did not return a success response");
		}
	} catch (error) {
		console.error("Error submitting form:", error);
		toast({description: "Error updating profile"});
	}
};