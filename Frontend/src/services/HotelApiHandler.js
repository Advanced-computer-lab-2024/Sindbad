import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
import { store } from "../state management/userInfo";

// Function to get the access token from the Redux store
function getAccessToken() {
	const state = store.getState(); // Access the Redux state
	return state.user?.accessToken; // Adjust this based on your Redux structure
}

const getHotelsByCity = async (cityCode, radius) => {
	const endpoint = `${baseURL}/hotel/by-city`;

	try {
		const token = getAccessToken(); // Extract the token
		const response = await axios.get(endpoint, {
			params: { cityCode, radius },
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : undefined, // Add token if available
			},
			withCredentials: true, // Include cookies if required
		});
		return response;
	} catch (error) {
		console.error("Error fetching hotels:", error);
		throw error;
	}
};

const getHotelsByGeocode = async (latitude, longitude, radius) => {
	const endpoint = `${baseURL}/hotel/by-geocode`;

	try {
		const token = getAccessToken(); // Extract the token
		const response = await axios.get(endpoint, {
			params: { latitude, longitude, radius },
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : undefined, // Add token if available
			},
			withCredentials: true, // Include cookies if required
		});
		return response;
	} catch (error) {
		console.error("Error fetching hotels:", error);
		throw error;
	}
};

const getHotelOffers = async (hotelId) => {
	const endpoint = `${baseURL}/hotel/${hotelId}/offers`;

	try {
		const token = getAccessToken(); // Extract the token
		const response = await axios.get(endpoint,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: token ? `Bearer ${token}` : undefined, // Add token if available
				},
				withCredentials: true, // Include cookies if required
			}
		);
		return response;
	} catch (error) {
		console.error("Error fetching hotel offers:", error);
		throw error;
	}
};

const bookHotel = async (bookingValues, bookingId, travelerId) => {
	const endpoint = `${baseURL}/hotel/book`;

	try {
		const token = getAccessToken(); // Extract the token
		const response = await axios.post(endpoint, {
			bookingValues,
			bookingId,
			travelerId,
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : undefined, // Add token if available
			},
			withCredentials: true, // Include cookies if required
		});
		console.log("Hotel booked:", response);
		return response.data;
	} catch (error) {
		console.error("Error booking hotel:", error);
		throw error;
	}
};

export { getHotelsByCity, getHotelsByGeocode, bookHotel, getHotelOffers };
