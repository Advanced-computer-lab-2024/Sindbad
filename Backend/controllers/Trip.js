const Sale = require("../models/Sale");
const Trip = require("../models/Trip");
const Tourist = require("../models/Tourist");
const cloudinary = require("../utils/cloudinary");
const DatauriParser = require("datauri/parser");
const path = require('path');

// Create a new trip
async function createTrip(req, res) {
    try {
        if (req.files.cardImage) {
            const cardImage = req.files.cardImage[0];
            const parser = new DatauriParser();
            const extName = path.extname(cardImage.originalname);
            const file64 = parser.format(extName, cardImage.buffer);
            const cardImageUpload = await cloudinary.uploader.upload(
                file64.content,
                {
                    folder: "transportation",
                    resource_type: "image",
                }
            );
            req.body.cardImage = {
                public_id: cardImageUpload.public_id,
                url: cardImageUpload.secure_url,
            };
        }

        if (typeof req.body.price === "string") {
            req.body.price = parseFloat(req.body.price);
        }

        if (req.body.pickupLocation) {
            req.body.pickupLocation = JSON.parse(req.body.pickupLocation);
        }
        if (req.body.dropoffLocation) {
            req.body.dropoffLocation = JSON.parse(req.body.dropoffLocation);
        }

        const savedTrip = await Trip.create(req.body);
        res.status(201).json(savedTrip);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// Get all trips
async function getAllTrips(req, res) {
    try {
        const trips = await Trip.find();
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get a specific trip by ID
async function getTrip(req, res) {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }
        res.status(200).json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Book a trip
async function bookTrip(req, res) {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        const { userId, discount, type } = req.body;

        if (trip.capacity === trip.participants.length) {
            return res.status(409).json({ message: "Trip is fully booked" });
        }

        if (trip.participants.includes(userId)) {
            return res.status(400).json({ message: "User already booked this trip" });
        }

        if (type == "wallet") {
            const user = await Tourist.findById(userId);
            if (user.wallet < (trip.price - (trip.price * discount/100))) {
                return res.status(400).json({ message: "Insufficient funds" });
            }
            user.wallet -= trip.price - (trip.price * discount/100);
            await user.save();
        }

        trip.participants.push(userId);

        await trip.save();
        await Sale.create({
            type: "Trip",
            itemId: trip._id,
            buyerId: userId,
            totalPrice: trip.price - (trip.price * discount/100),
        });
        res.status(200).json({ message: "Trip booked successfully", trip });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update an existing trip
async function updateTrip(req, res) {
    try {
        const tripId = req.params.id;

        const updatedData = req.body;

        if (req.files.cardImage) {
            const cardImage = req.files.cardImage[0];
            const parser = new DatauriParser();
            const extName = path.extname(cardImage.originalname);
            const file64 = parser.format(extName, cardImage.buffer);
            const cardImageUpload = await cloudinary.uploader.upload(
                file64.content,
                {
                    folder: "transportation",
                    resource_type: "image",
                }
            );
            req.body.cardImage = {
                public_id: cardImageUpload.public_id,
                url: cardImageUpload.secure_url,
            };
        }

        if (typeof req.body.price === "string") {
            req.body.price = parseFloat(req.body.price);
        }

        if (req.body.pickupLocation) {
            req.body.pickupLocation = JSON.parse(req.body.pickupLocation);
        }
        if (req.body.dropoffLocation) {
            req.body.dropoffLocation = JSON.parse(req.body.dropoffLocation);
        }

        const updatedTrip = await Trip.findByIdAndUpdate(tripId, updatedData, {
            new: true,
        });

        if (!updatedTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        res.status(200).json(updatedTrip); // Return the updated trip data
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Delete a trip
async function deleteTrip(req, res) {
    try {
        const { tripId } = req.params; // The ID of the trip to delete

        // Find the trip by ID and remove it
        const deletedTrip = await Trip.findByIdAndDelete(tripId);

        if (!deletedTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        res.status(200).json({ message: "Trip deleted successfully" }); // Confirm deletion
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Get trips by creatorId
async function getMyTrips(req, res) {
    try {
        const { creatorId } = req.params;

        const trips = await Trip.find({ creatorId: creatorId });

        if (!trips) {
            return res
                .status(404)
                .json({ message: "No trips found for this creator" });
        }

        // Return the found trips
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Export all methods
module.exports = {
    createTrip,
    getAllTrips,
    getTrip,
    getMyTrips,
    bookTrip,
    updateTrip,
    deleteTrip,
};
