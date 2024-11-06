import { updateTourismGovernor } from "@/services/TourismGovernorApiHandler";

export const tourismGovernorSubmit = (values, id) => {
    return updateTourismGovernor(id, values);
}