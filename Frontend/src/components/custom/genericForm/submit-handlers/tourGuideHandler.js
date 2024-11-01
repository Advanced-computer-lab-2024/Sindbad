import { updateTourGuide } from '@/services/TourGuideApiHandler';

export const tourGuideSubmit = (values, id) => {
    return updateTourGuide(id, values);
}