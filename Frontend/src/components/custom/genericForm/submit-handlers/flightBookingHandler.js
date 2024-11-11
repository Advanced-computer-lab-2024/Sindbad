import { bookFlight, confirmFlightPrice } from "@/services/FlightApiHandler";

export const flightBookingHandler = (values, id, navigate, dispatch) => {
	confirmFlightPrice(values).then((response) => {
        bookFlight(id, response).then((response) => {
            navigate("/booking-confirmation");
        });
    });
};