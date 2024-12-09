import { updateTourismGovernor } from "@/services/TourismGovernorApiHandler";

export const tourismGovernorSubmit = async (values, id, navigate, dispatch, currency, toast, setLoading) => {
	setLoading(true);
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

	// return updateTourismGovernor(id, formData);

	try {
		let response = await updateTourismGovernor(id, formData);

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