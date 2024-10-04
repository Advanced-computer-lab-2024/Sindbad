import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

export const getAllUsers = async () => {
	try {
		// Perform all API calls concurrently using Promise.all
		const [advertisers, admins, tourists, tourGuides, sellers] =
			await Promise.all([
				axios.get(`${baseURL}/advertiser/profiles`, {
					headers: { "Content-Type": "application/json" },
					withCredentials: true, 
				}),
				axios.get(`${baseURL}/admin`, {
					headers: { "Content-Type": "application/json" },
					withCredentials: true, 
				}),
				axios.get(`${baseURL}/tourist`, {
					headers: { "Content-Type": "application/json" },
					withCredentials: true, 
				}),
				axios.get(`${baseURL}/tourGuide`, {
					headers: { "Content-Type": "application/json" },
					withCredentials: true, 
				}),
				axios.get(`${baseURL}/seller`, {
					headers: { "Content-Type": "application/json" },
					withCredentials: true, 
				}),
			]);

		console.log(advertisers, admins, tourists, tourGuides, sellers);

		// Extract the data and append the "role" field
		const combinedUsers = [
			...advertisers.data.map((user) => ({ ...user, role: "advertiser" })),
			...admins.data.map((user) => ({ ...user, role: "admin" })),
			...tourists.data.map((user) => ({ ...user, role: "tourist" })),
			...tourGuides.data.map((user) => ({ ...user, role: "tourGuide" })),
			...sellers.data.map((user) => ({ ...user, role: "seller" })),
		];

		return combinedUsers; // Return the combined collection
	} catch (error) {
		console.error("Error fetching users: ", error);
		throw error; // Handle errors appropriately
	}
};
