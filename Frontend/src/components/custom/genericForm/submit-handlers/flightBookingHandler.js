import { bookFlight } from "@/services/FlightApiHandler";
import { confirmationResponse } from "@/state management/confirmationResponse";

export const flightBookingHandler = (values, id, data, navigate, dispatch, currency) => {
  // console.log("VALUES: ", values);
  let submitValues = {};
  submitValues.travelers = values;
  submitValues.travelerID = id;
  submitValues.data = {};
  submitValues.data.type = "flight-offers-pricing";
  submitValues.data.flightOffers = [data];

  console.log("Flight booking data after adding travelers:", submitValues);
  bookFlight(submitValues).then((response) => {
    console.log("Flight booking response:", response);
    confirmationResponse.data = response;
    confirmationResponse.success = true;
    confirmationResponse.message = "Flight booking successful!";
    navigate("/app/flight/confirmation");
  });
};