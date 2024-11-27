const mongoose = require("mongoose");

// Define the schema for the Flight model
const FlightSchema = new mongoose.Schema(
    {
        BookingNumber: {
            type: String,
			required: true,
        },
        FlightNumber: {
            type: [String],
			required: true,
        },
        Duration: {
            type: [Number],
			required: true,
        },
        DepartureLocation: {
            type: [String],
			required: true,
        },
        ArrivalLocation: {
            type: [String],
			required: true,
        },
        DepartureDateTime: {
            type: [Date],
			required: true,
        },
        ArrivalDateTime: {
            type: [Date],
			required: true,
        },
        price: {
            type: String,
			required: true,
        },
        travelerID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tourist",
            required: true,
        },
    },
    { timestamps: true }
  );
  
  // Create the Flight model
  const Flight = mongoose.model("Flight", FlightSchema);
  
  module.exports = Flight;