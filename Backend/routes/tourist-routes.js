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


//Get certain tourist profile
router.get('/:id' , getTourist , (req,res) => {
	res.json(res.tourist);
})

//TODO: add that it can update wallet and complete method
//updating a tourist
router.patch('/:id', getTourist, async(req,res) => {
	if(req.body.email !=null){
		res.tourist.email = req.body.email;
	}
	if(req.body.username !=null){
		res.tourist.username = req.body.username;
	}
	if(req.body.passwordHash !=null){
		res.tourist.passwordHash = req.body.passwordHash;
	}
	if(req.body.mobileNumber !=null){
		res.tourist.mobileNumber = req.body.mobileNumber;
	}
	if(req.body.nationality !=null){
		res.tourist.nationality = req.body.nationality;
	}
	if(req.body.DOB !=null){
		res.tourist.DOB = req.body.DOB;
	}
	if(req.body.job !=null){
		res.tourist.job = req.body.job;
	}
	if(req.body.wallet !=null){
		res.tourist.wallet = req.body.wallet;
	}

	try{
		const updatedTourist = await res.tourist.save();
		res.json(updatedTourist);
	} catch(err){
		return res.status(400).json({message:err.message});
	}
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