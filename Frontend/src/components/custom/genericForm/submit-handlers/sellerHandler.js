import { updateSeller } from '@/services/SellerApiHandler';

export const sellerSubmit = (values, id) => {
    return updateSeller(id, values);
}