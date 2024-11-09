import { bookHotel } from "@/services/HotelApiHandler";
import { confirmationResponse } from "@/state management/confirmationResponse";

export const hotelBookingSubmit = async (values, id, navigate, dispatch) => {
    console.log("Hotel booking values:", values);
    confirmationResponse.data = await bookHotel(values, id);
    console.log(confirmationResponse)
    confirmationResponse.success = true;
    confirmationResponse.message = "Hotel booking successful!";
    navigate("/app/hotel/confirmation")
}