import axiosInstance from "./axiosInstance";

export const getAllSites = async (siteName, tagName) => {
	try {
		const response = await axiosInstance.get(
			`/site`, {
			params: {
				siteName,
				tagName,
			},
		});

		return response.data;
	} catch (error) {
		return error;
	}
};

export const getMySites = async (tourismGovernorId) => {
	try {
		const response = await axiosInstance.get(`/site/my-sites/${tourismGovernorId}`);

		return response.data;
	} catch (error) {
		return error;
	}
};

export const createSite = async (siteData) => {
	try {
		const response = await axiosInstance.post(
			`/site/`,
			siteData
		);

		return response.data;
	} catch (error) {
		return error;
	}
};

export const updateSite = async (siteId, updatedValues) => {
	try {
		const response = await axiosInstance.put(
			`/site/${siteId}`,
			updatedValues,
			{
				resourceName: "Site",
			}
		);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const deleteSite = async (siteId) => {
	try {
		const response = await axiosInstance.delete(`/site/${siteId}`);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const getSiteById = async (siteId) => {
	try {
		const response = await axiosInstance.get(
			`/site/${siteId}`,
			{
				resourceName: "Site",
			}
		);

		return response.data;
	} catch (error) {
		return error;
	}
};
