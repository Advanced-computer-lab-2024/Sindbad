import { addAddress } from "@/services/TouristApiHandler";

export const touristAddressSubmit = (values, id, navigate, dispatch, currency, toast) => {
	return addAddress(id, values);
};