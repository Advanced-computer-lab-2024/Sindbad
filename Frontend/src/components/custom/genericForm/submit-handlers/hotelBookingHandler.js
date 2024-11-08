import { bookHotel } from "@/services/HotelApiHandler";

export const hotelBookingSubmit = (values, id) => {
    return bookHotel(values, id);
}