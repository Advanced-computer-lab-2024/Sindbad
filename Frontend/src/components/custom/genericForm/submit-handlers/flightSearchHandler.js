import { getFlights } from "@/services/FlightApiHandler";

export const flightSearchHandler = (values, id, navigate, dispatch, currency) => {
	return getFlights(values);
};