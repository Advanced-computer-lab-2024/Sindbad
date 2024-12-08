import { updateTourGuide } from '@/services/TourGuideApiHandler';
import { setCurrency } from "@/state management/userInfo";

export const tourGuideSubmit = async (values, id, navigate, dispatch, currency, toast, setLoading) => {
	setLoading(true);
	dispatch(setCurrency(values.preferredCurrency));

	// Prepare FormData
	const formData = new FormData();
	formData.append("email", values.email);
	formData.append("mobileNumber", values.mobileNumber);
	formData.append("preferredCurrency", values.preferredCurrency);

	// Append files
	if (values.profileImageUri && values.profileImageUri.length > 0) {
		formData.append("profileImageUri", values.profileImageUri[0]); // First file from FileList
	}

	if (values.bannerImageUri && values.bannerImageUri.length > 0) {
		formData.append("bannerImageUri", values.bannerImageUri[0]); // First file from FileList
	}

	// Debug FormData
	for (let pair of formData.entries()) {
		console.log(pair[0] + ": ", pair[1]);
	}

	// Call API handler
	// return updateTourGuide(id, formData);

	try {
		let response = await updateTourGuide(id, formData);

		if (response && !response.error && navigate) {
			navigate("/app/profile");
			toast({description: "Profile updated successfully"});
			setLoading(false);
		} else {
			throw new Error("API did not return a success response");
		}
	} catch (error) {
		console.error("Error submitting form:", error);
		toast({description: "Error updating profile"});
		setLoading(false);
	}
};
