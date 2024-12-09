import React from "react";
import { confirmationResponse } from "@/state management/confirmationResponse";

function FlightConfirmation({ confirmationData }) {
    confirmationData = confirmationResponse?.data;
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDuration = (hours) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const generateFlightDetails = () => {
    if (!confirmationData?.FlightNumber?.length)
      return "No flight details available";

    return confirmationData.FlightNumber.map(
      (flightNum, index) => `
            <strong>Flight ${index + 1}:</strong><br/>
            - Flight Number: ${flightNum}<br/>
            - Departure: ${
              confirmationData.DepartureLocation?.[index] || "N/A"
            } 
              on ${
                formatDateTime(confirmationData.DepartureDateTime?.[index]) ||
                "N/A"
              }<br/>
            - Arrival: ${confirmationData.ArrivalLocation?.[index] || "N/A"} 
              on ${
                formatDateTime(confirmationData.ArrivalDateTime?.[index]) ||
                "N/A"
              }<br/>
            - Duration: ${
              formatDuration(confirmationData.Duration?.[index]) || "N/A"
            }<br/><br/>
        `
    ).join("");
  };

  const message = `
        Your flight booking has been confirmed!<br/><br/>
        <strong>Itinerary:</strong><br/><br/>
        ${generateFlightDetails()}
        <strong>Booking Details:</strong><br/>
        - Booking Reference: ${confirmationData?._id || "N/A"}<br/>
        - Total Cost: $${confirmationData?.price || "N/A"}<br/>
        Please keep this confirmation for your records. Safe travels!
    `;

  return (
    <div className="py-8 px-24 max-w-[1200px] mx-auto">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-extrabold shrink-0">
          Flight Booking Confirmed!
        </h1>
        <h3 className="italic text-neutral-400">
          Booking Number: {confirmationData?.BookingNumber || "N/A"}
        </h3>
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
    </div>
  );
}

export default FlightConfirmation;