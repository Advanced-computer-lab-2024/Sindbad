import { bookHotel } from "@/services/HotelApiHandler";
import { confirmationResponse } from "@/state management/confirmationResponse";

export const hotelBookingSubmit = async (values, id, data, navigate, dispatch, currency, toast, setLoading) => {
  console.log("Hotel booking values:", values);
  // confirmationResponse.data = await bookHotel(values, data, id);
  // console.log(confirmationResponse)
  // confirmationResponse.success = true;
  // confirmationResponse.message = "Hotel booking successful!";
  // navigate("/app/hotel/confirmation");
  setLoading(true);
  bookHotel(values, data, id).then((response) => {
    setLoading(false);
    console.log("Hotel booking response:", response);
    confirmationResponse.data = response;
    confirmationResponse.success = true;
    confirmationResponse.message = "Hotel booking successful!";
    navigate("/app/hotel/confirmation");
  }).catch((error) => {
    setLoading(false);
    console.error("Error submitting form:", error);
    toast({ description: "Error booking hotel" });
  });
}