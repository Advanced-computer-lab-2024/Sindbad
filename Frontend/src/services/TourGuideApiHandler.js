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

export const updateTourGuide = async (tourGuideId, updatedValues) => {
	try {
		const response = axiosInstance.put(
			`/tourGuide/${tourGuideId}`,
			updatedValues,
			{
				resourceName: "Tour guide",
			}
		);

		return response.data;
	} catch (error) {
		return error;
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
