import { createSeller, updateSeller } from '@/services/SellerApiHandler';

export const sellerSubmit = (values, id) => {
    if (id) {
        return updateSeller(id, values);
    }
    return createSeller(values);
}