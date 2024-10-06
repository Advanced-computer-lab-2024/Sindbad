import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;

export const getAllActivities = async (searchTerm, budget, date, category, rating, sortBy, sortOrder) => {
    try {
        // Build the params object dynamically
        const params = {};

        // Only include non-default values
        if (searchTerm) params.searchTerm = searchTerm;

        if (budget) {
            console.log('budget:', budget);
            params.budget = budget; // You can send both min and max or format it differently as needed
        }

        if (date && (date.start || date.end)) {
            params.date = date;
        }

        if (category) {
            params.category = category;
        }

        if (rating && (rating.min !== 0 || rating.max !== 5)) {
            params.rating = rating; // Again, you can send both min and max or customize as needed
        }

        if (sortBy) params.sortBy = sortBy;
        if (sortOrder) params.sortOrder = sortOrder;
        // Make the request with the dynamic params
        const response = await axios.get(`${baseURL}/activity/`, {
            headers: {
                'Content-Type': 'application/json',
            },
            params, // Pass the dynamically built params object
        });

        // Handle the response as before
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 404) {
            return {
                error: true,
                message: 'No activities found.',
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
                message: error.response.data.error || 'Unknown error occurred',
                status: error.response.status,
            };
        } else if (error.request) {
            return {
                error: true,
                message: 'No response from server. Please try again later.',
            };
        } else {
            return {
                error: true,
                message: 'An error occurred during request setup. Please try again.',
            };
        }
    }
};
export const getMyActivities = async (advertiserId) => {
    try {
        const response = await axios.get(`${baseURL}/activity/my-activities/${advertiserId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            return response.data;
        } else if (response.status === 404) {
            return {
                error: true,
                message: 'No activities found.',
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
                message: error.response.data.error || 'Unknown error occurred',
                status: error.response.status,
            };
        } else if (error.request) {
            return {
                error: true,
                message: 'No response from server. Please try again later.',
            };
        } else {
            return {
                error: true,
                message: 'An error occurred during request setup. Please try again.',
            };
        }
    }
};
export const createActivity = async (activity) => {
    try {
        
        const response = await axios.post(`${baseURL}/activity/`, activity, {
            headers: {
                'Content-Type': 'application/json',
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
                message: error.response.data.error || 'Unknown error occurred',
                status: error.response.status,
            };
        } else if (error.request) {
            return {
                error: true,
                message: 'No response from server. Please try again later.',
            };
        } else {
            return {
                error: true,
                message: 'An error occurred during request setup. Please try again.',
            };
        }
    }
}

export const updateActivity = async (activityId, activity) => {
    try {
        const response = await axios.put(`${baseURL}/activity/${activityId}`, activity, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
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
                message: error.response.data.error || 'Unknown error occurred',
                status: error.response.status,
            };
        } else if (error.request) {
            return {
                error: true,
                message: 'No response from server. Please try again later.',
            };
        } else {
            return {
                error: true,
                message: 'An error occurred during request setup. Please try again.',
            };
        }
    }
}
export const deleteActivity = async (activityId) => {
    try {
        const response = await axios.delete(`${baseURL}/activity/${activityId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
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
                message: error.response.data.error || 'Unknown error occurred',
                status: error.response.status,
            };
        } else if (error.request) {
            return {
                error: true,
                message: 'No response from server. Please try again later.',
            };
        } else {
            return {
                error: true,
                message: 'An error occurred during request setup. Please try again.',
            };
        }
    }
}