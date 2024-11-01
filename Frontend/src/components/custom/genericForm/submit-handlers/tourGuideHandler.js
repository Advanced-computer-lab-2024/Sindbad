import { createTourGuide, updateTourGuide } from '@/services/TourGuideApiHandler';

export const tourGuideSubmit = (values, id) => {
    if (id) {
        return updateTourGuide(id, values);
    }
    return createTourGuide(values);
}