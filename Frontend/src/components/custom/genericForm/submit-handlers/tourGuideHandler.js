import { updateTourGuide } from '@/services/TourGuideApiHandler';
import { setCurrency } from "@/state management/userInfo";

export const tourGuideSubmit = (values, id, navigate, dispatch) => {
	dispatch(setCurrency(values.preferredCurrency));
	return updateTourGuide(id, values);
};