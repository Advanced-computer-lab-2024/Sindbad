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

export const addAddress = async (touristId, address) => {
  try {
    const response = await axiosInstance.post(`/tourist/${touristId}/address`, address);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const checkoutWithStripe = async (id, cart) => {
  try {
    const response = await fetch('http://localhost:3000/checkout/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cart: cart
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create Stripe session.');
    }

    const { url } = await response.json();
    window.location.href = url; // Redirect to Stripe Checkout
  } catch (error) {
    console.error('Error:', error.message);
    alert('Something went wrong. Please try again later.');
  }
}