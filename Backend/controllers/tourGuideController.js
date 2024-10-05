const TourGuide = require("../models/TourGuide");
const mongoose = require("mongoose");



/**
 * Retrieves a tourGuide by its ID
 *
 * @param {Object} req - The request object containing the tourGuide ID in the body
 * @param {Object} res - The response object used to send the retrieved tourGuide or an error message
 * @returns {Object} - A JSON object of the retrieved tourGuide or an error message
 */
const getTourGuide =async (req,res) => {
    let tourGuide
	try{
		tourGuide = await TourGuide.findById(req.params.id);
		if (tourGuide == null) {
			return res.status(404).json({ message: "Tour Guide not found" });
		}
        
	} catch (err) {
		return res.status(500).json({
			message: "Error retrieving Tour Guide",
			error: err.message,
		});
	}

    if (tourGuide.isAccepted){
        res.json(tourGuide);
    }else{
        return res.status(404).send('TourGuide not accepted yet');
	}
	
};

/**
 * Retrieves all tourGuides
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object used to send the retrieved tourGuides or an error message
 * @returns {Object} - A JSON object of the retrieved tourGuides or an error message
 */
const getAllTourGuides = async (req, res) => {
	try {
		const tourGuides = await TourGuide.find();
		res.json(tourGuides);
	} catch (err) {
		res.status(500).json({ message: err.message }); // pass err to catch block
	}
};



/**
 * Updates a tourGuide's profile
 *
 * @param {Object} req - Request with tourGuide ID
 * @param {Object} res - Response object for sending results
 * @returns {Object} - Updated tourGuide profile or error message
 */
const updateTourGuide = async(req,res) => {
    let tourGuide
	try{
		tourGuide = await TourGuide.findById(req.params.id);
		if (tourGuide == null) {
			return res.status(404).json({ message: "Tour Guide not found" });
		}
        
	} catch (err) {
		return res.status(500).json({
			message: "Error retrieving Tour Guide",
			error: err.message,
		});
	}
    if (tourGuide.isAccepted){
        res.tourGuide = tourGuide;
    }else{
        return res.status(404).send('TourGuide not accepted yet');
	}


    if(req.body.email !=null){
        res.tourGuide.email = req.body.email;
    }
    if(req.body.username !=null ){
        res.tourGuide.username = req.body.username;
    }
    if(req.body.passwordHash !=null ){
        res.tourGuide.passwordHash = req.body.passwordHash;
    }
    if(req.body.mobileNumber !=null ){
        res.tourGuide.mobileNumber = req.body.mobileNumber;
    }
    if(req.body.yearsOfExperience !=null ){
        res.tourGuide.yearsOfExperience = req.body.yearsOfExperience;
    }
	if (req.body.previousWork != null) {
		res.tourGuide.previousWork = res.tourGuide.previousWork.concat(req.body.previousWork);
	}
    

	try{
		const updatedTourGuide = await res.tourGuide.save();
		res.json(updatedTourGuide);
	} catch(err){
		return res.status(400).json({
			message: "Error saving Tour Guide's information",
			error: err.message,
		});
	}
};


/**
 * deletes a tourGuides's profile
 *
 * @param {Object} req - Request with tourGuide's ID
 * @returns {Object} - Deleted tourGuide's profile or error message
 */
const deleteTourGuide = async (req,res) => {
	try{
		const deletedTourGuide = await TourGuide.findByIdAndDelete(req.params.id);
		if (deletedTourGuide == null) {
			return res.status(404).json({ message: "Tour Guide not found" });
		}else{
			res.json(deletedTourGuide);
		}
	} catch (err) {
		return res.status(500).json({
			message: "Error deleting Tour Guide",
			error: err.message,
		});
	}
};


module.exports = {
	getAllTourGuides,
    getTourGuide,
	getAllTourGuides,
    updateTourGuide,
	deleteTourGuide,
  };

/*
//create
//Create a tourguide profile
//Register (sign up) as a tour guide/ advertiser/ seller on the system with username, email and password
router.post("/", async (req, res) => {
	
	const tourGuide = new TourGuide({
		email: req.body.email,
		username : req.body.username,
		passwordHash : req.body.passwordHash

	})
	try{
		const newTourGuide = await tourGuide.save();
		res.status(201).json(newTourGuide)
	}catch(err){
		res.status(400).json({message:err.message});
	}
	
});



*/