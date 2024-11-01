import axiosInstance from "./axiosInstance";

export const getSeller = async (sellerId) => {
    try {
        const response = await axiosInstance.get(
            `/seller/${sellerId}`,
            {
                resourceName: 'Seller',
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateSeller = async (sellerId, updatedValues) => {
    try {
        const response = axiosInstance.put(
            `/seller/${sellerId}`,
            updatedValues,
            {
                resourceName: 'Seller',
            }
        );
        return response.data;
    }
    catch (error) {
        return error;
    }
}

export const getMyProducts = async (sellerId) => {
    try {
        const response = await axiosInstance.get(`/seller/${sellerId}/products`);
        return response.data;
    } catch (error) {
        return error;
    }
};