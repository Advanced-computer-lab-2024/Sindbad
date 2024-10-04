import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

export const getAllUsers = async () => {
	try {
		// Fetch all users
		let users = await axios.get(`${baseURL}/user/allUsers`);
		return users; 
	} catch (error) {
		console.error("Error fetching users: ", error);
		throw error; // Handle errors appropriately
	}
};

export const deleteUser = async (id, role) => {
	try {
		console.log(id, role);
		let user = await axios.delete(`${baseURL}/user/${id}`, { data: { role } });
		return user; 
	} catch (error) {
		console.error("Error deleting user: ", error);
		throw error; // Handle errors appropriately
	}
};
