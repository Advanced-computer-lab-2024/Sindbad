import { updateAdvertiser } from '@/services/AdvertiserApiHandler';
import { setCurrency } from "@/state management/userInfo";

export const advertiserSubmit = (values, id, navigate, dispatch) => {
	dispatch(setCurrency(values.preferredCurrency));
	return updateAdvertiser(values, id);
};