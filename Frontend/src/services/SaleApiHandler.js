import axiosInstance from "./axiosInstance";

export const getAllSales = async () => {
    try {
        const response = await axiosInstance.get("/sale/", {
        resourceName: "Sale",
        });
        return response.data;
    } catch (error) {
        return error;
    }
    }

export const getMySales = async (type, creatorId) => {
    try {
        const response = await axiosInstance.get(`/sale/my-sales/${type}/${creatorId}`, {
        resourceName: "Sale",
        });
        return response.data;
    } catch (error) {
        return error;
    }
    }
