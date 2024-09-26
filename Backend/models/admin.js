const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

//TODO: Update schema to link with User 
const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  }
}, { timestamps: true });

AdminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Admin", AdminSchema);
