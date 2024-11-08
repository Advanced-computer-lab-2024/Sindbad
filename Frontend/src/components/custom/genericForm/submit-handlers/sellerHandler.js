import { updateSeller } from '@/services/SellerApiHandler';

export const sellerSubmit = (values, id) => {
    console.log("Seller values: ", values);
    return updateSeller(id, values);
}