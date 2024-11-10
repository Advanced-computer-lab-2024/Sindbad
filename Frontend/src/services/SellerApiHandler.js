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

// Remove getMyProducts function
// export const getMyProducts = async (sellerId) => {
//     try {
//         const response = await axiosInstance.get(`/seller/${sellerId}/products`);
//         return response.data;
//     } catch (error) {
//         return error;
//     }
// };

export const updateSellerFiles = async (sellerId, files) => {
	const formData = new FormData();

	if (files.idCardImage) {
		formData.append("idCardImage", files.idCardImage[0]);
	}
	if (files.taxationRegistryCardImage) {
		formData.append("taxationRegistryCardImage", files.taxationRegistryCardImage[0]);
	}

	try {
		const response = await axiosInstance.post(`/seller/upload/${sellerId}/`, 
			formData
		  , {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		  }
		)

		return response.data;
	} catch (error) {
		return error;
	}
}