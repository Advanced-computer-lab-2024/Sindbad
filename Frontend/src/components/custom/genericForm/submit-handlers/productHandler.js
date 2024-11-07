import { createProduct, updateProduct } from "@/services/ProductApiHandler";

export const productSubmit = (values, id, data) => {
    if (data) {
      updateProduct(data._id, values);
    } else {
      const productWithId = {
        ...values,
        creatorId: id,
      };
      createProduct(productWithId);
    }
  }