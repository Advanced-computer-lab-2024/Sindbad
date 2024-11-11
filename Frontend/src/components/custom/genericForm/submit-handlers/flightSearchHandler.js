import { getFlights } from "@/services/FlightApiHandler";

export const flightSearchHandler = (values, id, navigate, dispatch) => {
	return getFlights(values);
};