const mongoose = require("mongoose");

const activitySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a the name of the activity"],
  },
  dateTime: {
    type: Date,
    required: [true, "Please add the date of the activity"],
  },
  location: {
    type: String,
    required: [true, "Please add the location of the activity"],
  },
  price: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, "Please add the price of the activity"],
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Please add the category of the activity"],
  },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag",
      required: [true, "Please add the tags of the activity"],
      //   validate: {
      //     validator: function(tags) {
      //         return tags.length <= 10; //Limiting tags to 10
      //     },
      //     message: "You can only add up to 10 tags.""
      // }
    },
  ],
  discounts: {
    type: Number,
    validate: {
      validator: function (value) {
        return value >= 0 && value <= 100;
      },
      message: "Discount must be between 0 and 100.",
    },
  },
  isBookingOpen: {
    type: Boolean,
    default: true,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Advertiser",
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

module.exports = mongoose.model("Activity", activitySchema);
