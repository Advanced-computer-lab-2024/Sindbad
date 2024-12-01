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
    const response = axiosInstance.put(`/tourist/${touristId}`, formData, {
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

export const checkoutWithStripe = async (id, cart) => {
  try {
    const response = await fetch("http://localhost:3000/checkout/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
        cart: cart,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create Stripe session.");
    }

    const { url } = await response.json();
    window.location.href = url; // Redirect to Stripe Checkout
  } catch (error) {
    console.error("Error:", error.message);
    alert("Something went wrong. Please try again later.");
  }
};

export const checkoutWithWallet = async (touristId, cart) => {
  try {
    const response = await axiosInstance.post(`/checkout/wallet`, {
      userId: touristId,
      cart: cart,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const checkoutWithCod = async (touristId, cart) => {
  try {
    const response = await axiosInstance.post(`/checkout/cod`, {
      userId: touristId,
      cart: cart,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
