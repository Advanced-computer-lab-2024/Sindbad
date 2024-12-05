import axiosInstance from "./axiosInstance";

export const createTrip = async (formData) => {
    try {
        const response = await axiosInstance.post(
            `/trip/create/`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Explicitly set for FormData
                },
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getAllTrips = async () => {
    try {
        const response = await axiosInstance.get(`/trip/`, {
            resourceName: "Trip",
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getTrip = async (id) => {
    try {
        const response = await axiosInstance.get(`/trip/${id}`, {
            resourceName: "Trip",
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const bookTrip = async (userId, tripId) => {
    try {
        const response = await axiosInstance.post(`/trip/${tripId}/book`, {
            resourceName: "Trip",
            userId,
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateTrip = async (tripId, formData) => {
    try {
        const response = await axiosInstance.put(
            `/trip/${tripId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Explicitly set for FormData
                },
                resourceName: "Trip",
            }
        );
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : error;
    }
};

export const deleteTrip = async (tripId) => {
    try {
        const response = await axiosInstance.delete(`/trip/${tripId}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : error;
    }
};

export const getMyTrips = async (creatorId) => {
    try {
        const response = await axiosInstance.get(`/trip/my-trips/${creatorId}`);
        return response.data;
    } catch (error) {
        return error.response ? error.response.data : error;
    }
};
