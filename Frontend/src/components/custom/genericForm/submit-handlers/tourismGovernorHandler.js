import { updateTourismGovernor } from "@/services/TourismGovernorApiHandler";

export const tourismGovernorSubmit = (values, id, navigate, dispatch) => {
	return updateTourismGovernor(id, values);
};