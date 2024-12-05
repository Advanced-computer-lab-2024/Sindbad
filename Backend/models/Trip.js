const mongoose = require("mongoose");

const TripSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add the name of the activity"],
        },
        description: {
            type: String,
        },
        dateTime: {
            type: Date,
            required: [true, "Please add the date of the activity"],
        },
        price: {
            type: Number,
            required: [true, "Please add the price of the activity"],
        },
        pickupLocation: {
            address: { type: String, required: true },
            coordinates: {
                lat: { type: Number, required: true },
                lng: { type: Number, required: true },
            },
        },
        dropoffLocation: {
            address: { type: String, required: true },
            coordinates: {
                lat: { type: Number, required: true },
                lng: { type: Number, required: true },
            },
        },
        cardImage: {
            public_id: {
                type: String,
                required: this.cardImage !== undefined,
            },
            url: {
                type: String,
                required: this.cardImage !== undefined,
            },
        },
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Advertiser",
        },
        capacity: {
            type: Number,
            default: 0,
        },
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tourist",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Trip", TripSchema);
