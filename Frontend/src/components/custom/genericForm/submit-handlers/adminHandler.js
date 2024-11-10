import { updateAdmin } from "@/services/AdminApiHandler";

export const adminSubmit = (values, id, navigate, dispatch) => {
	return updateAdmin(id, values);
};