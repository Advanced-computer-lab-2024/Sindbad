import { updateTourist } from "@/services/TouristApiHandler";
import { setCurrency } from "@/state management/userInfo";

export const touristSubmit = (values, id, navigate, dispatch) => {
	dispatch(setCurrency(values.preferredCurrency));
	return updateTourist(id, values);
};