const mongoose = require("mongoose");
const { Schema } = mongoose;


const hotelSchema = new Schema({
  bookingId: {
    type: String,
    required: true,
  },
  travelerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tourist",
    required: true,
  },
  bookingStatus: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
  },
  checkOutDate: {
    type: Date,
  },
  totalPrice: {
    type: String,
  },
  hotelName: {
    type: String,
  },
});

// Create models
const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = { Hotel};
