import { bookFlight } from "@/services/FlightApiHandler";
import { confirmationResponse } from "@/state management/confirmationResponse";

export const flightBookingHandler = (values, id, data, navigate, dispatch, currency, toast, setLoading) => {
  // console.log("VALUES: ", values);
  setLoading(true);
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
    setLoading(false);
  }).catch((error) => {
    console.error("Error submitting form:", error);
    toast({ description: "Error booking flight" });
    setLoading(false);
  });
};