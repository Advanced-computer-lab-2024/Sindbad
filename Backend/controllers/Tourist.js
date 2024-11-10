const Tourist = require("../models/Tourist");
const mongoose = require("mongoose");

/**
 * Retrieves a tourist by its ID
 *
 * @param {Object} req - The request object containing the tourist ID in the body
 * @param {Object} res - The response object used to send the retrieved tourist or an error message
 * @returns {Object} - A JSON object of the retrieved tourist or an error message
 */

const getTouristById = async (req, res) => {
  let tourist;
  try {
    tourist = await Tourist.findById(req.params.id);
    if (tourist == null) {
      return res.status(404).json({ message: "Tourist not found" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error finding tourist",
      error: err.message,
    });
  }
  return res.json(tourist);
};

const getTouristByUsername = async (req, res) => {
  let tourist;
  try {
    tourist = await Tourist.findOne({ username: req.params.username });
    if (tourist == null) {
      return res.status(404).json({ message: "Tourist not found" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error finding tourist",
      error: err.message,
    });
  }
  return res.json(tourist);
};

/**
 * Retrieves all tourists
 * @param {Object} req - The request object
 * @param {Object} res - The response object used to send the retrieved tourists or an error message
 * @returns {Object} - A JSON object of the retrieved tourists or an error message
 */
const getAllTourists = async (req, res) => {
  try {
    const tourists = await Tourist.find();
    res.json(tourists);
  } catch {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Updates a tourist's profile
 *
 * @param {Object} req - Request with tourist ID
 * @param {Object} res - Response object for sending results
 * @returns {Object} - Updated tourist profile or error message
 */

const updateTourist = async (req, res) => {
  let tourist;
  try {
    tourist = await Tourist.findById(req.params.id);
    if (tourist == null) {
      return res.status(404).json({ message: "Tourist not found" });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error finding tourist",
      error: err.message,
    });
  }
  res.tourist = tourist;

  if (req.body.email != null) {
    res.tourist.email = req.body.email;
  }
  if (req.body.mobileNumber != null) {
    res.tourist.mobileNumber = req.body.mobileNumber;
  }
  if (req.body.nationality != null) {
    res.tourist.nationality = req.body.nationality;
  }
  if (req.body.DOB != null) {
    res.tourist.DOB = req.body.DOB;
  }
  if (req.body.job != null) {
    res.tourist.job = req.body.job;
  }
  if (req.body.wallet != null) {
    res.tourist.wallet = req.body.wallet;
  }
  if (req.body.preferences != null) {
    res.tourist.preferences = req.body.preferences;
  }
  if (req.body.profileImageUri != null) {
    res.tourist.profileImageUri = req.body.profileImageUri;
  }
  if (req.body.bannerImageUri != null) {
    res.tourist.bannerImageUri = req.body.bannerImageUri;
  }
  if (req.body.preferredCurrency != undefined) {
    res.tourist.preferredCurrency = req.body.preferredCurrency;
  }

  try {
    const updatedTourist = await res.tourist.save();
    res.json(updatedTourist);
  } catch (err) {
    return res.status(400).json({
      message: "Error updating tourist",
      error: err.message,
    });
  }
};

/**
 * deletes a tourist's profile
 *
 * @param {Object} req - Request with tourist ID
 * @returns {Object} - Deleted tourist profile or error message
 */
const deleteTourist = async (req, res) => {
  try {
    const deletedTourist = await Tourist.findByIdAndDelete(req.params.id);
    if (deletedTourist == null) {
      return res.status(404).json({ message: "Tourist not found" });
    } else {
      res.json(deletedTourist);
    }
  } catch (err) {
    return res.status(500).json({
      message: "Error deleting Tourist",
      error: err.message,
    });
  }
};

const redeemPoints = async (req, res) => {
  try {
    const touristId = req.params.id;
    const tourist = await Tourist.findById(touristId);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }
    if (tourist.loyaltyPoints === 0)
      return res
        .status(400)
        .json({ message: "You don't have any points to redeem" });

    tourist.wallet += tourist.loyaltyPoints / 100;
    tourist.loyaltyPoints = 0;

    await tourist.save();

    res.status(200).json({
      message: "Points redeemed successfully",
      wallet: tourist.wallet,
      loyaltyPoints: tourist.loyaltyPoints,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error redeeming points",
      error: err.message,
    });
  }
};

module.exports = {
  getAllTourists,
  getTouristById,
  getTouristByUsername,
  getAllTourists,
  updateTourist,
  deleteTourist,
  redeemPoints,
};

/*
//create
router.post("/", async (req, res) => {
	
  const tourist = new Tourist({
    email: req.body.email,
    username : req.body.username,
    passwordHash : req.body.passwordHash,
    mobileNumber: req.body.mobileNumber,
    nationality: req.body.nationality,
    DOB: req.body.DOB,
    job: req.body.job

  })
  try{
    const newTourist = await tourist.save();
    res.status(201).json(newTourist)
  }catch(err){
    res.status(400).json({message:err.message});
  }
	
});
*/
