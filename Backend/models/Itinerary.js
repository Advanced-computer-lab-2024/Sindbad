const mongoose = require("mongoose");

const itinerarySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the name of the itinerary"],
    },
    activities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Activity",
        required: [true, "Please add the activities of the itinerary"],
      },
    ],
    locations: {
      type: [String],
      required: [true, "Please add the locations of the itinerary"],
    },
    timeline: {
      type: [String],
      required: [true, "Please add the timeline of the itinerary"],
    },
    duration: {
      type: Number,
      required: [true, "Please specify the duration of the itinerary"],
    },
    languages: {
      type: [String],
      required: [true, "Please add the supported languages"],
    },
    price: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "Please add the price"],
      validate: {
        validator: function (value) {
          // Check if it's either a fixed price (number) or a price range (object)
          return (
            (typeof value === "number" && value >= 0) || // Fixed price must be non-negative
            (typeof value === "object" &&
              value !== null &&
              typeof value.min === "number" &&
              typeof value.max === "number" &&
              value.min >= 0 && // Ensure min is non-negative
              value.max >= value.min) // Ensure max is greater than or equal to min
          );
        },
        message:
          "Price must be either a non-negative number (fixed price) or a valid price range (object with min and max).",
      },
    },
    availableDatesTimes: [
      {
        dateTime: {
          type: Date,
          required: [
            true,
            "Please add available dates and times for the itinerary",
          ],
        },
        headCount: {
          type: Number,
          default: 0,
        },
      },
    ],
    accessibility: {
      type: [String],
      required: [true, "Please specify accessibility options."],
    },
    pickUpLocation: {
      type: String,
      required: [true, "Please add the pick-up location"],
    },
    dropOffLocation: {
      type: String,
      required: [true, "Please add the drop-off location"],
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourGuide",
      required: [true, "Please add the creator of the itinerary"],
    },
    headCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Map,
      of: Number,
      default: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
    },
    comments: [
      {
        userId: {
           type: mongoose.Schema.Types.ObjectId, ref: "User", required: true 
          },
        comment: { 
          type: String, required: true 
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    isInappropriate: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isBookingOpen: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Itinerary", itinerarySchema);
