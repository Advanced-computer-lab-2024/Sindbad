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

export const getAllTags =  async () => {
    try {
        // Fetch all tags
        let tags = await axios.get(`${baseURL}/tag`);
        return tags; 
    } catch (error) {
        console.error("Error fetching tags: ", error);
        throw error; // Handle errors appropriately
    }
}

export const createTag = async (tag) => {
    try {
        // Create a tag
        let newTag = await axios.post(`${baseURL}/tag`, tag);
        return newTag;
    } catch (error) {
        console.error("Error creating tag: ", error);
        throw error; // Handle errors appropriately
    }
}

export const updateTag = async (tag) => {
    try {
        // Update a tag
        let updatedTag = await axios.put(`${baseURL}/tag/${tag.id}`, tag);
        return updatedTag;
    } catch (error) {
        console.error("Error updating tag: ", error);
        throw error; // Handle errors appropriately
    }
}

export const deleteTag = async (tagId) => {
    try {
        // Delete a tag
        let deletedTag = await axios.delete(`${baseURL}/tag/${tagId}`);
        return deletedTag;
    } catch (error) {
        console.error("Error deleting tag: ", error);
        throw error; // Handle errors appropriately
    }
}

export const getAllCategories = async () => {
    try {
        // Fetch all categories
        let categories = await axios.get(`${baseURL}/category`);
        return categories; 
    } catch (error) {
        console.error("Error fetching categories: ", error);
        throw error; // Handle errors appropriately
    }
}

export const createCategory = async (category) => {
    try {
        // Create a category
        let newCategory = await axios.post(`${baseURL}/category`, category);
        return newCategory;
    } catch (error) {
        console.error("Error creating category: ", error);
        throw error; // Handle errors appropriately
    }
}

export const updateCategory = async (category) => {
    try {
        // Update a category
        let updatedCategory = await axios.put(`${baseURL}/category/${category.id}`, category);
        return updatedCategory;
    } catch (error) {
        console.error("Error updating category: ", error);
        throw error; // Handle errors appropriately
    }
}

export const deleteCategory = async (categoryId) => {
    try {
        // Delete a category
        let deletedCategory = await axios.delete(`${baseURL}/category/${categoryId}`);
        return deletedCategory;
    } catch (error) {
        console.error("Error deleting category: ", error);
        throw error; // Handle errors appropriately
    }
}

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

