const express = require("express");
const router = express.Router();
const TourGuide = require("../models/TourGuide");


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


//Get all tourGuides
router.get('/' , async (req,res) => {
	try{
		const tourGuides = await TourGuide.find();
		res.json(tourGuides);
	}catch{
		res.status(500).json({message:err.message});
	}
	
})


//Get certain tourGuide profile
router.get('/:id' , getTourGuide , (req,res) => {
	res.json(res.tourGuide);
})


//Create/ Update my profile with my information as a tour guide including mobile number, 
//years of experience, previous work(if exists), etc.. if accepted as a tour guide on the system

// Create/updating a tourGuide profile
router.patch('/:id', getTourGuide, async(req,res) => {
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
    if(req.body.previousWork !=null ){
        res.tourGuide.previousWork = req.body.previousWork;
    }
    

	try{
		const updatedTourGuide = await res.tourGuide.save();
		res.json(updatedTourGuide);
	} catch(err){
		return res.status(400).json({message:err.message});
	}
})


async function getTourGuide(req,res,next){
	let tourGuide
	try{
		tourGuide = await TourGuide.findById(req.params.id);
		if (tourGuide == null) {
			return res.status(404).send('Cannot find TourGuide');
		}
        
	} catch (err) {
		return res.status(500).json({message:err.message});
	}
    if (tourGuide.isAccepted){
        res.tourGuide = tourGuide;
    }else{
        return res.status(404).send('TourGuide not accepted yet');
	}
	next();
}


module.exports = router;



/*
//create

*/