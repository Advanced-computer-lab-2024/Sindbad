import { createProduct, updateProduct } from "@/services/ProductApiHandler";
import { Convert } from "easy-currencies";

export const productSubmit = async (values, id, data, navigate, dispatch, currency) => {
	const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
	// convert price to USD
    const converter = await Convert().from("USD").fetch();
    const convertedPrice = values.price / converter.rates[currency];
    formData.append("price", convertedPrice);
	formData.append("quantity", values.quantity);

	if (values.cardImage && values.cardImage.length > 0) {
        formData.append("cardImage", values.cardImage[0]);
    }

    for (var pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }

	try {
        let response;
        if (data) {
            response = await updateProduct(data._id, formData);
        } else {
            formData.append("creatorId", id);
            response = await createProduct(formData);
        }

        if (response && !response.error && navigate) {
            navigate("/app/profile");
        } else {
            throw new Error("API did not return a success response");
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
};