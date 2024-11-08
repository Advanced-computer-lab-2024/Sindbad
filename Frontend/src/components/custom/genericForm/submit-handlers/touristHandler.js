import { updateTourist } from "@/services/TouristApiHandler";

export const touristSubmit = (values, id, navigate) => {
	return updateTourist(id, values);
};