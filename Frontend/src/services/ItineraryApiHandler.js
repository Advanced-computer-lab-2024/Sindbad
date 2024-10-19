import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

export const getMyItineraries = async (tourGuideId) => {
	try {
		const response = await axios.get(
			`${baseURL}/itinerary/my-itineraries/${tourGuideId}`,
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
				message: "No itineraries found.",
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

export const updateItinerary = async (itineraryId, itineraryData) => {
	try {
		const response = await axios.put(
			`${baseURL}/itinerary/${itineraryId}`,
			itineraryData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (response.status === 200) {
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
				message: "An error occurred during request setup. Please try again.",
			};
		}
	}
};
export const createItinerary = async (itineraryData) => {
	try {
		const response = await axios.post(`${baseURL}/itinerary`, itineraryData, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status === 201) {
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
				message: "An error occurred during request setup. Please try again.",
			};
		}
	}
};
export const deleteItinerary = async (itineraryId) => {
	try {
		const response = await axios.delete(`${baseURL}/itinerary/${itineraryId}`, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status === 200) {
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
				message: "An error occurred during request setup. Please try again.",
			};
		}
	}
};
export const getAllItineraries = async (
	searchTerm,
	budget,
	date,
	tag,
	rating,
	language,
	sortBy,
	sortOrder
) => {
	try {
		// Build the params object dynamically
		const params = {};

		// Only include non-default values
		if (searchTerm) params.searchTerm = searchTerm;

		// Budget filter (min and max)
		if (budget && (budget.min !== undefined || budget.max !== undefined)) {
			params.budget = {};
			if (budget.min !== undefined) params.budget.min = budget.min;
			if (budget.max !== undefined) params.budget.max = budget.max;
		}

		// Date filter
		if (date && (date.start || date.end)) {
			params.date = {};
			if (date.start) params.startDate = date.start;
			if (date.end) params.endDate = date.end;
		}

		// Category filter
		if (tag) {
			params.tag = tag;
		}

		// Rating filter (min and max)
		if (rating && (rating.min !== undefined || rating.max !== undefined)) {
			params.rating = {};
			if (rating.min !== undefined) params.rating.min = rating.min;
			if (rating.max !== undefined) params.rating.max = rating.max;
		}

		// Language filter
		if (language) {
			params.language = language;
		}

		// Sorting options
		if (sortBy) params.sortBy = sortBy;
		if (sortOrder) params.sortOrder = sortOrder;

		console.log("params:", params);

		// Make the request with the dynamic params
		const response = await axios.get(`${baseURL}/itinerary/`, {
			headers: {
				"Content-Type": "application/json",
			},
			params, // Pass the dynamically built params object
		});

		console.log("response:", response);

		// Handle the response as before
		if (response.status === 200) {
			return response.data;
		} else if (response.status === 404) {
			return {
				error: true,
				message: "No itineraries found.",
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

export const getItineraryById = async (itineraryId) => {
	try {
		const response = await axios.get(`${baseURL}/itinerary/${itineraryId}`, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status === 200) {
			return response.data;
		} else if (response.status === 404) {
			return {
				error: true,
				message: "No itinerary found.",
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
