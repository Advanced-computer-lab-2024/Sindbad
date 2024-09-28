const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a category name"],
    unique: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
