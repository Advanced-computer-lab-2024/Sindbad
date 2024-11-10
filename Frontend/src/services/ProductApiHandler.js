import axiosInstance from "./axiosInstance";

export const getAllProducts = async (search, minprice, maxprice, sortrating) => {
	try {
		const response = await axiosInstance.get(`/product?search=${search}&minprice=${minprice}&maxprice=${maxprice}&sortrating=${sortrating}`);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const updateProduct = async (productId, productData) => {
	try {
		const response = await axiosInstance.put(
			`/product/${productId}`,
			productData,
			{
				resourceName: "Product",
			}
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const createProduct = async (productData) => {
	try {
		const response = await axiosInstance.post(
			`/product`,
			productData
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
			`/product/review/${productId}`,
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

