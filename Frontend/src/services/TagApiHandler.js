import axiosInstance from "./axiosInstance";

export const getTag = async (tagId) => {
    try {
        const response = await axiosInstance.get(
            `/tag/${tagId}`,
            {
                resourceName: 'Tag',
            }
        );

        return response.data;
    } catch (error) {
        return error;
    }
};

