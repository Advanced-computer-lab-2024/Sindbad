import { updateAdvertiser } from '@/services/AdvertiserApiHandler';
import { setCurrency } from "@/state management/userInfo";

export const advertiserSubmit = async (values, id, navigate, dispatch, currency, toast) => {
	dispatch(setCurrency(values.preferredCurrency));

	const formData = new FormData();
	formData.append("email", values.email);
	formData.append("websiteLink", values.websiteLink);
	formData.append("hotline", values.hotline);
	formData.append("preferredCurrency", values.preferredCurrency);

	if (values.profileImageUri && values.profileImageUri.length > 0) {
		formData.append("profileImageUri", values.profileImageUri[0]);
	}

	if (values.bannerImageUri && values.bannerImageUri.length > 0) {
		formData.append("bannerImageUri", values.bannerImageUri[0]);
	}

	for (let pair of formData.entries()) {
		console.log(pair[0] + ": ", pair[1]);
	}

	// return updateAdvertiser(formData, id);

	try {
		let response = await updateAdvertiser(formData, id);

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