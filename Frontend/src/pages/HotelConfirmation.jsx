import { confirmationResponse } from "@/state management/confirmationResponse";

function HotelConfirmation() {
	const data = confirmationResponse?.data ?? {};
	const booking = data.hotelBookings?.[0] ?? {};
	const guest = data.guests?.[0] ?? {};
	const message = `
  We’re pleased to confirm your booking at ${
		booking.hotel?.name ?? "N/A"
	}.<br /><br />

  - Reservation ID: ${data.id ?? "N/A"}<br />
  - Check-In Date: ${booking.hotelOffer?.checkInDate ?? "N/A"}<br />
  - Check-Out Date: ${booking.hotelOffer?.checkOutDate ?? "N/A"}<br />
  - Room Type: ${booking.hotelOffer?.room?.description?.text ?? "N/A"} (${
		booking.hotelOffer?.roomQuantity ?? "N/A"
	} room)<br />
  - Guests: ${booking.hotelOffer?.guests?.adults ?? "N/A"} Adult${
		(booking.hotelOffer?.guests?.adults ?? 0) > 1 ? "s" : ""
	}<br />
  - Total Cost: $${
		booking.hotelOffer?.price?.total ?? "N/A"
	} (including base, service charges, city, and occupancy taxes)<br /><br />

  Your reservation has been ${booking.bookingStatus?.toLowerCase() ?? "N/A"} under the GDS reference ${
		data.associatedRecords?.[0]?.reference ?? "N/A"
	}.<br /><br />

  Cancellation Policy:<br />
  - Cancel before ${
		booking.hotelOffer?.policies?.cancellations?.[0]?.deadline ?? "N/A"
	} for a refund of $${booking.hotelOffer?.policies?.cancellations?.[0]?.amount ?? "N/A"}.<br /><br />

  Payment Information:<br />
  Paid via ${
		booking.payment?.paymentCard?.paymentCardInfo?.vendorCode === "VI"
			? "Visa"
			: "Credit Card"
	} (ending in ${booking.payment?.paymentCard?.paymentCardInfo?.cardNumber?.slice(
		-4
	) ?? "N/A"}).<br /><br />

  A copy of your booking details has been sent to ${guest.email ?? "N/A"}
`;

	return (
		<div className="py-8 px-24 max-w-[1200px] mx-auto">
			<div className="flex flex-col items-center gap-6">
				<h1 className="text-3xl font-extrabold shrink-0">Booking Confirmed!</h1>
				<h3 className="italics text-neutral-400">
					Confirmation Number: {" "}
					{data.hotelBookings?.[0]?.hotelProviderInformation?.[0]?.confirmationNumber ?? "N/A"}
				</h3>
				<p dangerouslySetInnerHTML={{ __html: message }} className="text-sm"></p>
				<hr className="border-neutral-300 border w-full mt-1.5" />
			</div>
		</div>
	);
}

export default HotelConfirmation;
