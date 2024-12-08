import { addAddress } from "@/services/TouristApiHandler";

export const touristAddressSubmit = (values, id, navigate, dispatch, currency, toast, setLoading) => {
	return addAddress(id, values);
};