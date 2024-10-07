import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

export const getAllSites = async (siteName, tagName) => {
	try {
		const response = await axios.get(`${baseURL}/site`, {
			headers: {
				"Content-Type": "application/json",
			},
			params: {
				siteName,
				tagName,
			},
		});

		if (response.status === 200) {
			console.log("Success: ", response.data);
			return response.data;
		} else if (response.status === 404) {
			console.log("Fail: ", response.data);
			return {
				error: true,
				message: "No sites found.",
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
				message:
					error.response.data.message || "Unknown error occurred",
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
				message:
					"An error occurred during request setup. Please try again.",
			};
		}
	}
};

export const getMySites = async (tourismGovernorId) => {
	try {
		const response = await axios.get(
			`${baseURL}/site/my-sites/${tourismGovernorId}`,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (response.status === 200) {
			console.log("success: ", response.data);
			return response.data;
		} else if (response.status === 404) {
			console.log("fail: ", response.data);
			return {
				error: true,
				message: "No sites found.",
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
				message:
					"An error occurred during request setup. Please try again.",
			};
		}
	}
};

export const createSite = async (siteData) => {
	try {
		const response = await axios.post(`${baseURL}/site/`, siteData, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status === 201) {
			console.log("success: ", response.data);
			return response.data;
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
				message:
					"An error occurred during request setup. Please try again.",
			};
		}
	}
};

export const updateSite = async (siteId, updatedValues) => {
	try {
		const response = axios.put(`${baseURL}/site/${siteId}`, updatedValues, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.status === 200) {
			return response.data;
		} else if (response.status === 404) {
			return {
				error: true,
				message: "Site not found.",
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
				message:
					"An error occurred during request setup. Please try again.",
			};
		}
	}
};
export const deleteSite = async (siteId) => {
	try {
		const response = axios.delete(`${baseURL}/site/${siteId}`, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (response.status === 200) {
			return response.data;
		} else if (response.status === 404) {
			return {
				error: true,
				message: "Site not found.",
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
				message:
					"An error occurred during request setup. Please try again.",
			};
		}
	}
};
