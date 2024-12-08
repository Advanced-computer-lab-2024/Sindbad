import { updateSeller } from '@/services/SellerApiHandler';
import { setCurrency } from "@/state management/userInfo";

export const sellerSubmit = async (values, id, navigate, dispatch, currency, toast) => {
	dispatch(setCurrency(values.preferredCurrency));

	const formData = new FormData();
	formData.append("email", values.email);
	formData.append("firstName", values.firstName);
	formData.append("lastName", values.lastName);
	formData.append("description", values.description);
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

	// return updateSeller(id, formData);
	
	try {
		let response = await updateSeller(id, formData);

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
