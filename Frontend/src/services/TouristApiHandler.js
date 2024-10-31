import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

export const getTouristById = async (touristId) => {
	try {
		const response = await axios.get(`${baseURL}/tourist/${touristId}`, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status === 200) {
			return response.data;
		} else if (response.status === 404) {
			return {
				error: true,
				message: "Tourist not found.",
				status: 404,
			};
		} else {
			return {
				error: true,
				message: `Unexpected status code: ${response.status}`,
			};
		}
	} catch (error) {
		if (error.response) {
			return {
				error: true,
				message: error.response.data.error || "Unknown error occurred",
				status: error.response.status,
			};
		} else if (error.request) {
			return {
				error: true,
				message: "No response from server. Please try again later.",
			};
		} else {
			return {
				error: true,
				message: "An error occurred during request setup. Please try again.",
			};
		}
	}
};

export const updateTourist = async (touristId, updatedValues) => {
	try {
		const response = axios.put(
			`${baseURL}/tourist/${touristId}`,
			updatedValues,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		if (response.status === 200) {
			return response.data;
		} else if (response.status === 404) {
			return {
				error: true,
				message: "Tour guide not found.",
				status: 404,
			};
		} else {
			return {
				error: true,
				message: `Unexpected status code: ${response.status}`,
			};
		}
	} catch (error) {
		if (error.response) {
			return {
				error: true,
				message: error.response.data.error || "Unknown error occurred",
				status: error.response.status,
			};
		} else if (error.request) {
			return {
				error: true,
				message: "No response from server. Please try again later.",
			};
		} else {
			return {
				error: true,
				message: "An error occurred during request setup. Please try again.",
			};
		}
	}
};
