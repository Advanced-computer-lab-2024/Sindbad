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
      public_id: {
        type: String,
        required: this.profileImageUri !== undefined,
      },
      url: {
        type: String,
        required: this.profileImageUri !== undefined,
      },
    },
    bannerImageUri: {
      public_id: {
        type: String,
        required: this.bannerImageUri !== undefined,
      },
      url: {
        type: String,
        required: this.bannerImageUri !== undefined,
      },
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
      default: "USD",
    },
    bookmarks: {
      type: [
        {
          productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Activity",
          },
        },
      ],
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
    Notifications: {
      type: [
        {
          title: {
            type: String,
          },
          Body: {
            type: String,
          },
          isSeen: {
            Type: Boolean,
          },
        },
      ],
      default: [],
    },
    wishlist: {
      type: [
        {
          productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product", // Reference to the Product model
          },
        },
      ],
      default: [],
    },
    cart: {
      type: [
        {
          productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product", // Reference to the Product model
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
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
    orders: [
      {
        sales: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sale",
          },
        ],
        cart: [
          {
            productID: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Product",
            },
            quantity: {
              type: Number,
              required: true,
            },
          },
        ],
        isDelivered: {
          type: Boolean,
          required: true,
          default: false, // Assuming new orders are not delivered by default
        },
      },
    ],
  },
  { timestamps: true }
);

// Create the Tourist model
const Tourist = mongoose.model("Tourist", TouristSchema);

module.exports = Tourist;
