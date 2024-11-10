const Trip = require("../models/Trip");

// Create a new trip
async function createTrip(req, res) {
  try {
    const {
      name,
      description,
      dateTime,
      price,
      pickupLocation,
      dropoffLocation,
      imageUris,
      discount,
      isBookingOpen,
      creatorId,
      capacity,
    } = req.body;

    const trip = new Trip({
      name,
      description,
      dateTime,
      price,
      pickupLocation,
      dropoffLocation,
      imageUris,
      discount,
      isBookingOpen,
      creatorId,
      capacity,
    });

    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
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

    const { userId } = req.body;

    if (trip.capacity === trip.participants.length) {
      return res.status(409).json({ message: "Trip is fully booked" });
    }

    if (trip.participants.includes(userId)) {
      return res.status(400).json({ message: "User already booked this trip" });
    }

    trip.participants.push(userId);

    await trip.save();
    res.status(200).json({ message: "Trip booked successfully", trip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Export all methods
module.exports = {
  createTrip,
  getAllTrips,
  getTrip,
  bookTrip,
};
