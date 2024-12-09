import { getFlights } from "@/services/FlightApiHandler";

export const flightSearchHandler = async (values, id, navigate, dispatch, currency, toast, setLoading) => {
	return await getFlights(values);
};