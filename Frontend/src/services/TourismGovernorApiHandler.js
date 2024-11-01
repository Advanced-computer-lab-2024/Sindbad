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
};