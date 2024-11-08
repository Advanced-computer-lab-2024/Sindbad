import { updateSeller } from '@/services/SellerApiHandler';

export const sellerSubmit = (values, id, navigate) => {
	return updateSeller(id, values);
};
