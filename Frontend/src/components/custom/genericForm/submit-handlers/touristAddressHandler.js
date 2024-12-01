import { addAddress } from "@/services/TouristApiHandler";

export const touristAddressSubmit = (values, id, navigate, dispatch) => {
	return addAddress(id, values);
};