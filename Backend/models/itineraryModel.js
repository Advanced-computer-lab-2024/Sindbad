const mongoose = require("mongoose");

const itinerarySchema = mongoose.Schema({
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
    type: Number,
    required: [true, "Please add the price of the itinerary"],
  },
  availableDatesTimes: {
    type: [Date],
    required: [true, "Please add available dates and times for the itinerary"],
  },
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
    type: String,
    required: [true, "Please add the creator of the itinerary"],
  },
  headCount: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Itinerary", itinerarySchema);
