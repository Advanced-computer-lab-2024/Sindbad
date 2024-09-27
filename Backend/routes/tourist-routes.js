const express = require("express");
const router = express.Router();
const Tourist = require("../models/tourist");

//Get all tourists
router.get('/' , async (req,res) => {
	try{
		const tourists = await Tourist.find();
		res.json(tourists);
	}catch{
		res.status(500).json({message:err.message});
	}
	
})

//TODO: add that it returns wallet
//Get certain tourist profile
router.get('/:id' , getTourist , (req,res) => {
	res.json(res.tourist);
})

//TODO: add that it can update wallet and complete method
//updating a tourist
router.patch('/', getTourist, (req,res) => {
	if(req.body.username !=null){
		res.tourist.username = req.body.username;
	}
	//do for other attributes
	//continue code
})

async function getTourist(req,res,next){
	let tourist
	try{
		tourist = await Tourist.findById(req.params.id);
		if (tourist == null) {
			return res.status(404).send('Cannot find Tourist');
		}
	} catch (err) {
		return res.status(500).json({message:err.message});
	}
	res.tourist = tourist;
	next();
}


module.exports = router;



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