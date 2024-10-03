const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add the product name"],
  },
  picture: {
    type: String,
    required: [true, "Please add a product picture URL"],
  },
  price: {
    type: Number,
    required: [true, "Please add the product price"],
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: "Price must be a non-negative number",
    },
  },
  description: {
    type: String,
    required: [true, "Please add a product description"],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: [true, "Please add the seller of the product"],
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [
    {
      type: String,
    },
  ],
  quantity: {
    type: Number,
    required: [true, "Please add the available quantity"],
    validate: {
      validator: function (value) {
        return value >= 0;
      },
      message: "Quantity must be a non-negative number",
    },
  },
  numSales: {
    type: Number,
    default: 0,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Product", productSchema);
