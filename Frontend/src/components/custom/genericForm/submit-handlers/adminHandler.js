import { updateAdmin } from "@/services/AdminApiHandler";

export const adminSubmit = (values, id, navigate) => {
	return updateAdmin(id, values);
};