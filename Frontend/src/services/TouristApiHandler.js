import axiosInstance from "./axiosInstance";

export const getTouristById = async (touristId) => {
  try {
    const response = await axiosInstance.get(`/tourist/${touristId}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getTouristByUsername = async (username) => {
  try {
    const response = await axiosInstance.get(`/tourist/user/${username}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateTourist = async (touristId, updatedValues) => {
  try {
    const response = axiosInstance.put(`/tourist/${touristId}`, updatedValues, {
      resourceName: "Tourist",
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const redeemPoints = async (touristId) => {
  try {
    const response = await axiosInstance.post(`/tourist/${touristId}`, {
      resourceName: "Tourist",
    });
    return response; // Return only the data from the response
  } catch (error) {
    console.log(error.status);
    return error;
  }
};

export const addItemToCart = async (touristId, itemId, amount) => {
  try {
    const response = await axiosInstance.post(`/tourist/${touristId}/cart`, {
      productID: itemId,
      quantity: amount,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export const removeItemFromCart = async (touristId, itemId) => {
  try {
    const response = await axiosInstance.delete(`/tourist/${touristId}/cart/${itemId}`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const getCart = async (touristId) => {
  try {
    const response = await axiosInstance.get(`/tourist/${touristId}/cart`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const updateCart = async (touristId, itemId, amount) => {
  try {
    const response = await axiosInstance.put(`/tourist/${touristId}/cart`, {
      productID: itemId,
      quantity: amount,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}