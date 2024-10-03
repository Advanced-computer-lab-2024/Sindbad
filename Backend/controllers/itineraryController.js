const Itinerary = require("../models/itineraryModel");

const getItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }
    res.status(200).json(itinerary);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting itinerary",
      error: error.message,
    });
  }
};

const createItinerary = async (req, res) => {
  try {
    const newItinerary = await Itinerary.create(req.body);
    res.status(201).json(newItinerary);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating itinerary",
      error: error.message,
    });
  }
};

const updateItinerary = async (req, res) => {
  try {
    const itineraryId = req.params.id;
    const updatedData = req.body;

    const updatedItinerary = await Itinerary.findByIdAndUpdate(
      itineraryId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedItinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.status(200).json(updatedItinerary);
  } catch (error) {
    return res.status(500).json({
      message: "Error updating itinerary",
      error: error.message,
    });
  }
};

const deleteItinerary = async (req, res) => {
  try {
    const itineraryId = req.params.id;

    const itinerary = await Itinerary.findById(itineraryId);

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    if (itinerary.headCount > 0) {
      return res.status(400).json({
        message: "Cannot delete itinerary because it has been booked already",
      });
    }

    await Itinerary.findByIdAndDelete(itineraryId);

    res.status(200).json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting itinerary",
      error: error.message,
    });
  }
};

module.exports = {
  getItinerary,
  createItinerary,
  updateItinerary,
  deleteItinerary,
};
