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
    } = req.body.values;

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

// Update an existing trip
async function updateTrip(req, res) {
  try {
    const { tripId } = req.params; // The ID of the trip to update
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
      capacity,
    } = req.body;

    // Find the trip by ID and update it
    const updatedTrip = await Trip.findByIdAndUpdate(
      tripId,
      {
        name,
        description,
        dateTime,
        price,
        pickupLocation,
        dropoffLocation,
        imageUris,
        discount,
        isBookingOpen,
        capacity,
      },
      { new: true } // The new option returns the updated document
    );

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
