import { bookHotel } from "@/services/HotelApiHandler";

export const hotelBookingSubmit = (values, id) => {
    console.log("Booking hotel with values:", values);
    return bookHotel(values, id);
}