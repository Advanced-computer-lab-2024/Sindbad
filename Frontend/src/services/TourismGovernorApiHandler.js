import axiosInstance from "./axiosInstance";

export const getTourismGovernor = async (tourismGovernorId) => {
	try {
		const response = await axiosInstance.get(
			`/tourism-governor/${tourismGovernorId}`,
			{
				resourceName: "Tourism governor",
			}
		);

		return response.data;
	} catch (error) {
		return error;
	}
}

export const updateTourismGovernor = async (tourismGovernorId, formData) => {
	try {
		const response = await axiosInstance.put(
			`/tourism-governor/${tourismGovernorId}`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data", // Explicitly set for FormData
				},
				resourceName: "Tourism governor",
			}
		);

		return response.data;
	} catch (error) {
		return error;
	}
}