import { updateTourismGovernor } from "@/services/TourismGovernorApiHandler";

export const tourismGovernorSubmit = (values, id, navigate) => {
	return updateTourismGovernor(id, values);
};