import { createAdvertiser, updateAdvertiser } from '@/services/AdvertiserApiHandler';

export const advertiserSubmit = (values, id) => {
    if (id) {
        return updateAdvertiser(id, values);
    }
    return createAdvertiser(values);
}