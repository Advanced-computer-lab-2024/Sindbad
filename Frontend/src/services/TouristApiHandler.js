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

export const updateTourist = async (touristId, formData) => {
  try {
    const response = await axiosInstance.put(`/tourist/${touristId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Explicitly set for FormData
      },
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

export const addActivityToBookmarks = async (touristId, activityID) => {
  try {
    const response = await axiosInstance.post(
      `/tourist/${touristId}/bookmark`,
      {
        activityID,
      }
    );
    return response;
  } catch (error) {
    return error.message;
  }
};

export const removeFromBookmarks = async (touristId, activityID) => {
  try {
    const response = await axiosInstance.delete(
      `/tourist/${touristId}/bookmark`,
      {
        data: { activityID }, // Use 'data' key to send the request body
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const getBookmarkedActivities = async (touristId) => {
  try {
    const response = await axiosInstance.get(`/tourist/${touristId}/bookmark`);
    return response;
  } catch (error) {
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
};

export const removeItemFromCart = async (touristId, itemId) => {
  try {
    const response = await axiosInstance.delete(
      `/tourist/${touristId}/cart/${itemId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCart = async (touristId) => {
  try {
    const response = await axiosInstance.get(`/tourist/${touristId}/cart`);
    return response.data;
  } catch (error) {
    return error;
  }
};

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
};

export const getWishlistProducts = async (touristId) => {
  try {
    const response = await axiosInstance.get(
      `/tourist/${touristId}/wishlist/products`
    );
    return response.data || [];
  } catch (error) {
    return error;
  }
};

export const removeFromWishlist = async (touristId, productID) => {
  try {
    const response = await axiosInstance.delete(
      `/tourist/${touristId}/wishlist`,
      {
        data: { productID },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addProductToWishlist = async (touristId, productID) => {
  try {
    const response = await axiosInstance.post(
      `/tourist/${touristId}/wishlist`,
      { productID } // Send productID directly in the body
    );
    return response.data || [];
  } catch (error) {
    return error;
  }
};

export const addAddress = async (touristId, address) => {
  try {
    const response = await axiosInstance.post(
      `/tourist/${touristId}/address`,
      address
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const checkoutWithStripe = async (id, cart, promoCode, type) => {
  try {
    const response = await axiosInstance.post("/checkout/stripe", {
      userId: id,
      cart: cart,
      promoCode: promoCode,
      type: type,
    });

    const url = response.data.url;
    window.location.href = url; // Redirect to Stripe Checkout
  } catch (error) {
    return error;
  }
};

export const checkoutWithWallet = async (touristId, cart, discount, type) => {
  try {
    const response = await axiosInstance.post(`/checkout/wallet`, {
      userId: touristId,
      cart: cart,
      discount: discount,
      type: type,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const checkoutWithCod = async (touristId, cart, type) => {
  try {
    const response = await axiosInstance.post(`/checkout/cod`, {
      userId: touristId,
      cart: cart,
      type: type,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const viewOrders = async (touristId) => {
  try {
    const response = await axiosInstance.get(`/tourist/${touristId}/orders`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const viewOrderDetails = async (touristId, orderId) => {
  try {
    const response = await axiosInstance.get(
      `/tourist/${touristId}/orders/${orderId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const cancelOrder = async (touristId, orderId) => {
  try {
    const response = await axiosInstance.delete(
      `/tourist/${touristId}/orders/${orderId}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
