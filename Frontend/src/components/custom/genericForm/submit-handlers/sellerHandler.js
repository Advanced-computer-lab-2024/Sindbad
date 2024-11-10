import { updateSeller } from '@/services/SellerApiHandler';
import { setCurrency } from "@/state management/userInfo";

export const sellerSubmit = (values, id, navigate, dispatch) => {
	dispatch(setCurrency(values.preferredCurrency));
	return updateSeller(id, values);
};
