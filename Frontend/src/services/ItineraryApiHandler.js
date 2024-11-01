import axiosInstance from "./axiosInstance";

export const getMyItineraries = async (tourGuideId) => {
	try {
		const response = await axiosInstance.get(
			`/itinerary/my-itineraries/${tourGuideId}`,
			{
				resourceName: "Itinerary",
			}
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const updateItinerary = async (itineraryId, itineraryData) => {
	try {
		const response = await axiosInstance.put(
			`/itinerary/${itineraryId}`,
			itineraryData,
			{
				resourceName: "Itinerary",
			}
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const createItinerary = async (itineraryData) => {
	try {
		const response = await axiosInstance.post(
			`/itinerary`,
			itineraryData
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const deleteItinerary = async (itineraryId) => {
	try {
		const response = await axiosInstance.delete(
			`/itinerary/${itineraryId}`,
			{
				resourceName: "Itinerary",
			}
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const getAllItineraries = async (searchTerm, budget, date, tag, rating, language, sortBy, sortOrder) => {
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
		const response = await axiosInstance.get(
			`/itinerary/`,
			{
				params, // Pass the dynamically built params object
				resourceName: "Itinerary",
			}
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const getItineraryById = async (itineraryId) => {
	try {
		const response = await axiosInstance.get(
			`/itinerary/${itineraryId}`,
			{
				resourceName: "Itinerary",
			}
		);
		return response.data;
	} catch (error) {
		return error;
	}
};