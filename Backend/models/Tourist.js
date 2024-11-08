const mongoose = require("mongoose");

// Define the schema for the Tourist model
const TouristSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^\S+@\S+\.\S+$/.test(v),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return !/\s/.test(v); // Check if there are no spaces
        },
        message: (props) =>
          `${props.value} contains spaces, which are not allowed!`,
      },
    },
    passwordHash: {
      type: String,
      required: true,
    },
    profileImageUri: {
      type: String,
    },
    bannerImageUri: {
      type: String,
    },
    mobileNumber: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^\+?[1-9]\d{1,14}$/.test(v), // Basic validation for international phone numbers
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    nationality: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
    wallet: {
      type: Number,
      default: 0,
    },
    preferredCurrency: {
      type: String,
      default: "EGP",
    },
    bookmarks: {
      type: [String], // Array of bookmark IDs or URLs
      default: [],
    },
    loyaltyPoints: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1, // Starting level
    },
    xpPoints: {
      type: Number,
      default: 0,
    },
    isReceiveNotifications: {
      type: Boolean,
      default: false,
    },
    wishlist: {
      type: [String], // Array of item IDs or details
      default: [],
    },
    cart: {
      type: [String], // Array of item IDs in the cart
      default: [],
    },
    addresses: [
      {
        type: [
          {
            label: {
              type: String,
              required: true,
            },
            street: {
              type: String,
              required: true,
            },
            city: {
              type: String,
              required: true,
            },
            state: {
              type: String,
              required: true,
            },
            zip: {
              type: String,
              required: true,
            },
            country: {
              type: String,
              required: true,
            },
          },
        ],
        default: [],
      },
    ],
    bookedEvents: {
      activities: [
        {
          activityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activity",
          },
          priceCharged: { type: Number, required: true },
        },
      ],
      itineraries: [
        {
          itineraryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Itinerary",
          },
          ticketsBooked: { type: Number, required: true, default: 1 },
          dateBooked: { type: Date, required: false },
        },
      ],
    },
    preferences: {
      type: [String],
    },
    isRequestedAccountDeletion: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create the Tourist model
const Tourist = mongoose.model("Tourist", TouristSchema);

module.exports = Tourist;
