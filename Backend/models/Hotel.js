const mongoose = require("mongoose");
const { Schema } = mongoose;


const hotelSchema = new Schema({
  bookingId: {
    type: String,
    required: true,
  },
  bookingStatus: {
    type: String,
    required: true,
  },
  hotelProviderInformation: [
    {
      hotelProviderCode: {
        type: String,
      },
      confirmationNumber: {
        type: String,
      },
    },
  ],
  hotelOffer: {
    id: {
      type: String,
    },
    type: {
      type: String,
    },
    checkInDate: {
      type: Date,
    },
    checkOutDate: {
      type: Date,
    },
    guests: {
      adults: {
        type: Number,
      },
    },
    price: {
      base: {
        type: String,
      },
      total: {
        type: String,
      },
      currency: {
        type: String,
      },
    },
  },
  hotel: {
    hotelId: {
      type: String,
    },
    chainCode: {
      type: String,
    },
    name: {
      type: String,
    },
  },
});

// Create models
const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = { Hotel};
