import { updateTourGuide } from '@/services/TourGuideApiHandler';

export const tourGuideSubmit = (values, id, navigate) => {
	return updateTourGuide(id, values);
};