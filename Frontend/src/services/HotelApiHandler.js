import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;


const getHotelsByCity = async (cityCode, radius) => {
	const endpoint = `${baseURL}/hotel/by-city`;

	try {
		const response = await axios.get(endpoint, {
			params: { cityCode, radius },
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
		const response = await axios.get(endpoint, {
			params: { latitude, longitude, radius },
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
		const response = await axios.get(endpoint);
		return response;
	} catch (error) {
		console.error("Error fetching hotel offers:", error);
		throw error;
	}
};

const bookHotel = async (bookingData, id) => {
	const endpoint = `${baseURL}/hotel/book`;

	try {
		const response = await axios.post(endpoint, { bookingData, id });
		console.log("Hotel booked:", response);
		return response.data;
	} catch (error) {
		console.error("Error booking hotel:", error);
		throw error;
	}
};

export { getHotelsByCity, getHotelsByGeocode, bookHotel, getHotelOffers };
