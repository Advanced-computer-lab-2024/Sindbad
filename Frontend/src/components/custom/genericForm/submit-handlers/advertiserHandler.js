import { updateAdvertiser } from '@/services/AdvertiserApiHandler';

export const advertiserSubmit = (values, id) => {
    return updateAdvertiser(values, id);
}