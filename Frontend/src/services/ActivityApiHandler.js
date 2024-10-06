import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;

export const getAllActivities = async (name, budget, date, category, rating, sortBy, sortOrder) => {
    try {
        // Step 1: Construct the search URL dynamically
        let searchQuery = `${baseURL}/activity/`; // Default to base URL

        if (name) {
            searchQuery = `${baseURL}/activity/search?searchTerm=${name}&`;
        }

        const searchResponse = await axios.get(searchQuery, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        let results = searchResponse.data; // Extract data from the response

        // Step 2: Construct the filter URL dynamically
        let filterQuery = `${baseURL}/activity/filter?`;
        let hasFilterParams = false;

        if (rating) {
            filterQuery += `rating=${rating}&`;
            hasFilterParams = true;
        }
        if (category) {
            filterQuery += `category=${category}&`;
            hasFilterParams = true;
        }
        if (budget) {
            filterQuery += `budget=${budget}&`;
            hasFilterParams = true;
        }
        if (date) {
            filterQuery += `date=${date}&`;
            hasFilterParams = true;
        }

        // If filter parameters exist, make the filter request
        let filteredResults = results;
        if (hasFilterParams) {
            const filterResponse = await axios.get(filterQuery, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Filter search results using the filter response
            filteredResults = results.filter(item =>
                filterResponse.data.some(filteredItem => filteredItem._id === item._id)
            );
        }

        // Step 3: Construct the sort URL dynamically
        let sortQuery = `${baseURL}/activity/sort?`;
        let hasSortParams = false;

        if (sortBy) {
            sortQuery += `sortBy=${sortBy}&`;
            hasSortParams = true;
        }
        if (sortOrder) {
            sortQuery += `sortOrder=${sortOrder}&`;
            hasSortParams = true;
        }

        // If sort parameters exist, make the sort request
        let finalResults = filteredResults;
        if (hasSortParams) {
            const sortResponse = await axios.get(sortQuery, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Sort the filtered results based on the order from the sort response
            finalResults = filteredResults.sort((a, b) => {
                let sortOrderA = sortResponse.data.findIndex(sortedItem => sortedItem._id === a._id);
                let sortOrderB = sortResponse.data.findIndex(sortedItem => sortedItem._id === b._id);
                return sortOrderA - sortOrderB;
            });
        }

        // Return the final sorted results
        if (finalResults.length > 0) {
            return finalResults;
        } else {
            return {
                error: true,
                message: 'No activities found.',
                status: 404,
            };
        }
    } catch (error) {
        // Error handling
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