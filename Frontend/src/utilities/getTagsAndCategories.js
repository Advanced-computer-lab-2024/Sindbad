import { getAllTags } from "@/services/AdminApiHandler";
import { getAllCategories } from "@/services/AdminApiHandler";

export async function getTags() {
    try {
        let tags = await getAllTags();
        return (tags.data.map((tag) => tag.name));
    } catch (error) {
        console.error("Error fetching tags: ", error);
        return error;
    }
}

export async function getCategories() {
    try {
        let categories = await getAllCategories();
        return (categories.data.map((tag) => tag.name));
    } catch (error) {
        console.error("Error fetching categories: ", error);
        return error;
    }
}