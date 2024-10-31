import axiosInstance from "./axiosInstance";

export const getAllActivities = async (searchTerm, budget, date, category, rating, sortBy, sortOrder) => {
	try {
		// Build the params object dynamically
		const params = {};

		// Only include non-default values
		if (searchTerm) params.searchTerm = searchTerm;

		if (budget) {
			params.budget = budget; // You can send both min and max or format it differently as needed
		}

		if (date && (date.start || date.end)) {
			params.date = date;
		}

		if (category) {
			params.category = category;
		}

		if (rating) {
			params.rating = rating; // Again, you can send both min and max or customize as needed
		}

		if (sortBy) params.sortBy = sortBy;
		if (sortOrder) params.sortOrder = sortOrder;

		// Make the request with the dynamic params
		const response = await axiosInstance.get(
			`/activity/`,
			{
				resourceName: "Activity",
				params, // Pass the dynamically built params object
			}
		);

		return response.data;
	} catch (error) {
		return error;
	}
};

export const getMyActivities = async (advertiserId) => {
	try {
		const response = await axiosInstance.get(
			`/activity/my-activities/${advertiserId}`,
			{
				resourceName: "Activity",
			}
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const createActivity = async (activity) => {
	try {
		const response = await axiosInstance.post(
			`/activity/`,
			activity
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const updateActivity = async (activityId, activity) => {
	try {
		const response = await axiosInstance.put(
			`/activity/${activityId}`,
			activity,
			{
				resourceName: "Activity",
			}
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const deleteActivity = async (activityId) => {
	try {
		const response = await axiosInstance.delete(
			`/activity/${activityId}`,
			{
				resourceName: "Activity",
			}
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const getActivityById = async (activityId) => {
	try {
		const response = await axiosInstance.get(
			`/activity/${activityId}`,
			{
				resourceName: "Activity",
			}
		);
		return response.data;
	} catch (error) {
		return error;
	}
};
