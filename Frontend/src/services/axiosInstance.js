import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
	baseURL: baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		const resourceName = error.config.resourceName || 'Resource';

		if (error.response) {
			// Handle 404 status with custom message based on resourceName
			if (error.response.status === 404) {
				return Promise.reject({
					error: true,
					message: `${resourceName} not found.`,
					status: 404,
				});
			}
			// Handle other unexpected status codes
			return Promise.reject({
				error: true,
				message: `Unexpected status code: ${error.response.status}`,
                display: error.response.data.error,
				status: error.response.status,
			});
		} else if (error.request) {
			// No response received from server
			return Promise.reject({
				error: true,
				message: 'No response from server. Please try again later.',
			});
		} else {
			// Error setting up the request
			return Promise.reject({
				error: true,
				message: 'Request setup error. Please try again.',
			});
		}
	}
);

export default axiosInstance;