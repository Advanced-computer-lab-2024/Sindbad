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

export const updateAdvertiserFiles = async (advertiserId, files) => {
	const formData = new FormData();

	if (files.idCardImage) {
		formData.append("idCardImage", files.idCardImage[0]);
	}
	if (files.taxationRegistryCardImage) {
		formData.append("taxationRegistryCardImage", files.taxationRegistryCardImage[0]);
	}

	try {
		const response = await axiosInstance.post(`/advertiser/upload/${advertiserId}/`, 
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