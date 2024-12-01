import axiosInstance from "./axiosInstance";

export const getTourGuide = async (tourGuideId) => {
	try {
		const response = await axiosInstance.get(
			`/tourGuide/${tourGuideId}`,
			{
				resourceName: "Tour guide",
			}
		);

		return response.data;
	} catch (error) {
		return error;
	}
};

export const updateTourGuide = async (tourGuideId, formData) => {
	try {
		const response = await axiosInstance.put(
			`/tourGuide/${tourGuideId}`,
			formData, // Pass FormData here
			{
				headers: {
					"Content-Type": "multipart/form-data", // Explicitly set for FormData
				},
				resourceName: "Tour guide",
			}
		);

		return response.data;
	} catch (error) {
		console.error("Error updating tour guide:", error);
		throw error;
	}
};

export const removeTourGuideWork = async (userId, experienceId) => {
	try {
		const response = await axiosInstance.delete(
			`/tourguide/${userId}/previous-work/${experienceId}`,
			{
				resourceName: "Experience",
			}
		);

		if (response.status === 200) {
			return {
				success: true,
				message: "Experience deleted successfully.",
			};
		}
	} catch (error) {
		return error;
	}
};
export const updateTourGuideFiles = async (tourGuideId, files) => {
	console.log("inAPICall")
	const formData = new FormData();

	if (files.idCardImage) {
		formData.append("idCardImage", files.idCardImage[0]);
	}
	if (files.certificateImage) {
		formData.append("certificateImage", files.certificateImage[0]);
	}

	try {
		const response = await axiosInstance.post(`/tourGuide/upload/${tourGuideId}/`, 
			formData
		  , {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		  }
		)

		return response.data;
	} catch (error) {
		return error;
	}
}

export const addTourGuideRating = async (tourGuideId, rating) => {
	try {
		const response = await axiosInstance.post(
			`/tourGuide/${tourGuideId}`,
			rating,
			{
				resourceName: "Tour guide",
			}
		);

		return response.data;
	} catch (error) {
		return error;
	}
}

export const addTourGuideComment = async (tourGuideId, comment) => {
	try {
		const response = await axiosInstance.post(
			`/tourGuide/${tourGuideId}/comment`,
			comment,
			{
				resourceName: "Tour guide",
			}
		);

		return response.data;
	} catch (error) {
		return error;
	}
}