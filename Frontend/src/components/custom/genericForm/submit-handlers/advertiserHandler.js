import { updateAdvertiser } from '@/services/AdvertiserApiHandler';

export const advertiserSubmit = (values, id, navigate) => {
	return updateAdvertiser(values, id);
};