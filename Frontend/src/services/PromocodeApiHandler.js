import axiosInstance from "./axiosInstance";

// Create a new promo code
export const createPromoCode = async (promoCodeData) => {
    try {
        const response = await axiosInstance.post(`/promocode`, promoCodeData);
        return response.data;
    } catch (error) {
        return error.response?.data || { message: "Error creating promo code", error };
    }
};

export const usePromoCode = async (touristId, promoCode) => {
    try {

        // Use PUT for applying the promo code
        const response = await axiosInstance.put(
            `/promocode/${touristId}`,
            { promocode: promoCode }
        );

        console.log("Promo code applied successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error applying promo code:", error.response?.data || error.message);
        return error.response?.data || { message: "Error applying promo code", error };
    }
};

