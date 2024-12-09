import axiosInstance from "./axiosInstance";

export const getAllUsers = async () => {
	try {
		// Fetch all users
		let users = await axiosInstance.get(`/user/`);
		return users;
	} catch (error) {
		console.error("Error fetching users: ", error);
		return error;
	}
};

export const getAllTags = async () => {
	try {
		// Fetch all tags
		let tags = await axiosInstance.get(`/tag`);
		return tags;
	} catch (error) {
		console.error("Error fetching tags: ", error);
		return error; // Handle errors appropriately
	}
};

export const createTag = async (tag) => {
	try {
		// Create a tag
		let newTag = await axiosInstance.post(`/tag`, tag);
		return newTag;
	} catch (error) {
		console.error("Error creating tag: ", error);
		return error; // Handle errors appropriately
	}
};

export const updateTag = async (tag) => {
	try {
		// Update a tag
		let updatedTag = await axiosInstance.put(`/tag/${tag.id}`, tag);
		return updatedTag;
	} catch (error) {
		console.error("Error updating tag: ", error);
		return error; // Handle errors appropriately
	}
};

export const deleteTag = async (tagId) => {
	try {
		// Delete a tag
		let deletedTag = await axiosInstance.delete(`/tag/${tagId}`);
		return deletedTag;
	} catch (error) {
		console.error("Error deleting tag: ", error);
		return error; // Handle errors appropriately
	}
};

export const getAllCategories = async () => {
	try {
		// Fetch all categories
		let categories = await axiosInstance.get(`/category`);
		return categories;
	} catch (error) {
		console.error("Error fetching categories: ", error);
		return error; // Handle errors appropriately
	}
};

export const getCategoryById = async (categoryId) => {
	try {
		// Fetch a category by ID
		let category = await axiosInstance.get(`/category/${categoryId}`);
		return category.data;
	} catch (error) {
		console.error("Error fetching category by ID: ", error);
		return error; // Handle errors appropriately
	}
};

export const createCategory = async (category) => {
	try {
		// Create a category
		let newCategory = await axiosInstance.post(`/category`, category);
		return newCategory;
	} catch (error) {
		console.error("Error creating category: ", error);
		return error; // Handle errors appropriately
	}
};

export const updateCategory = async (category) => {
	try {
		// Update a category
		let updatedCategory = await axiosInstance.put(`/category/${category.id}`, category);
		return updatedCategory;
	} catch (error) {
		console.error("Error updating category: ", error);
		return error; // Handle errors appropriately
	}
};

export const deleteCategory = async (categoryId) => {
	try {
		// Delete a category
		let deletedCategory = await axiosInstance.delete(`/category/${categoryId}`);
		return deletedCategory;
	} catch (error) {
		console.error("Error deleting category: ", error);
		return error; // Handle errors appropriately
	}
};

export const deleteUser = async (id, role) => {
	try {
		let user = await axiosInstance.delete(`/user/${id}`, { data: { role } });
		return user;
	} catch (error) {
		console.error("Error deleting user: ", error);
		return error; // Handle errors appropriately
	}
};

export const getAdmin = async (id) => {
	try {
		let admin = await axiosInstance.get(`/admin/${id}`);
		return admin.data;
	} catch (error) {
		console.error("Error fetching admin: ", error);
		return error; // Handle errors appropriately
	}
}

export const updateAdmin = async (id, formData) => {
	try {
		let admin = await axiosInstance.put(
			`/admin/${id}`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data", // Explicitly set for FormData
				},
				resourceName: "Admin",
			}
		);
		return admin.data;
	} catch (error) {
		console.error("Error editing admin: ", error);
		return error; // Handle errors appropriately
	}
}

export const getRequestedDeleteUsers = async () => {
	try {
		let users = await axiosInstance.get(`/admin/requested-account-deletion-users`);
		return users;
	} catch (error) {
		console.error("Error fetching requested delete users: ", error);
		return error; // Handle errors appropriately
	}
}