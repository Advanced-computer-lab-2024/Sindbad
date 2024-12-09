import axiosInstance from "./axiosInstance";

export const getAllProducts = async (search, minprice, maxprice, sortrating) => {
	try {
		const response = await axiosInstance.get(`/product?search=${search}&minprice=${minprice}&maxprice=${maxprice}&sortrating=${sortrating}`);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const updateProduct = async (productId, formData) => {
	try {
		const response = await axiosInstance.put(
			`/product/${productId}`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
				resourceName: "Product",
			}
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const createProduct = async (formData) => {
	try {
		const response = await axiosInstance.post(
			`/product`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const getProductById = async (productId) => {
	try {
		const response = await axiosInstance.get(
			`/product/${productId}`,
			{
				resourceName: "Product",
			}
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const getPriceMinMax = async () => {
	try {
		const response = await axiosInstance.get(`/product/price-min-max`);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const addProductRating = async (productId, ratingData) => {
	try {
		const response = await axiosInstance.post(
			`/product/${productId}`,
			ratingData
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const addProductReview = async (productId, reviewData) => {
	try {
		const response = await axiosInstance.post(
			`/product/${productId}/review`,
			reviewData
		);
		return response.data;
	} catch (error) {
		return error;
	}
}

export const getMyProducts = async (creatorId) => {
    try {
        const response = await axiosInstance.get(`/product/my-products/${creatorId}`);
        return response.data;
    } catch (error) {
        return error;
    }
};

export const buyProduct = async (productId, userId) => {
	try {
		const response = await axiosInstance.post(`/product/${productId}/buy`, { userId });
		return response.data;
	} catch (error) {
		return error;
	}
};

export const productSalesDetails = async (productId) => {
	try {
		const response = await axiosInstance.get(`/sale/sales-details/${productId}`);
		return response.data;
	} catch (error) {
		return error;
	}
};