import axiosInstance from "./axiosInstance";

export const getAdvertiser = async (advertiserId) => {
    try {
        const response = await axiosInstance.get(
            `/advertiser/${advertiserId}`,
            {
                resourceName: 'Advertiser',
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateAdvertiser = async (updatedValues, id) => {
    try {
        const response = axiosInstance.put(
            `/advertiser/${id}`,
            updatedValues,
            {
                resourceName: 'Advertiser',
            }
        );
        return response.data;
    }
    catch(error) {
        return error;
    }
}