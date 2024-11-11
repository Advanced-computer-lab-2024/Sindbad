import axiosInstance from "./axiosInstance";

export const createTrip = async (
  name,
  description,
  dateTime,
  price,
  pickupLocation,
  dropoffLocation,
  imageUris,
  discount,
  isBookingOpen,
  creatorId,
  capacity
) => {
  try {
    const response = await axiosInstance.post(`/trip/create/`, {
      resourceName: "Trip",
      name,
      description,
      dateTime,
      price,
      pickupLocation,
      dropoffLocation,
      imageUris,
      discount,
      isBookingOpen,
      creatorId,
      capacity,
    });
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

export const updateTrip = async (tripId, tripData) => {
  try {
    const response = await axiosInstance.put(`/trip/${tripId}`, tripData);
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
