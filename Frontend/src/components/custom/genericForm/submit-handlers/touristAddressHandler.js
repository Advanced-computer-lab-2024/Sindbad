import { addAddress } from "@/services/TouristApiHandler";

export const touristAddressSubmit = (values, id, navigate, dispatch, currency) => {
	return addAddress(id, values);
};