import { updateTourGuide } from "@/services/TourGuideApiHandler";

export const experienceSubmit = async (values, id, data, navigate, dispatch, currency, toast, setLoading) => {
	setLoading(true);
	const previousWork = {};
	for (const key in values) {
		if (key === "jobTitle") {
			previousWork.jobTitle = values[key];
		}
		if (key === "companyName") {
			previousWork.companyName = values[key];
		}
		if (key === "duration") {
			previousWork.duration = values[key];
		}
		if (key === "description") {
			previousWork.description = values[key];
		}
	}

	const body = {
		previousWork: {
			...previousWork,
		},
	};

	if (data) {
		body.previousWork._id = data._id;
	}

	// updateTourGuide(id, body);

	try {
		let response = await updateTourGuide(id, body);

		if (response && !response.error && navigate) {
			navigate("/app/profile");
			toast({description: "Experience updated successfully"});
			setLoading(false);
		} else {
			throw new Error("API did not return a success response");
		}
	} catch (error) {
		console.error("Error submitting form:", error);
		toast({description: "Error updating experience"});
		setLoading(false);
	}
};