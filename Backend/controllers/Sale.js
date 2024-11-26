const mongoose = require("mongoose");
const ProductSales = require("../models/ProductSale");
const ItinerarySales = require("../models/ItinerarySale");
const ActivitySales = require("../models/ActivitySale");
const Product = require("../models/Product");
const Itinerary = require("../models/Itinerary");
const Activity = require("../models/Activity");

const getAllSales = async (req, res) => {
  try {
    const productSales = await ProductSales.find();
    const itinerarySales = await ItinerarySales.find();
    const activitySales = await ActivitySales.find();

    res.status(200).json({
      productSales,
      itinerarySales,
      activitySales,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyActivitySales = async (req, res) => {
  try {
    const { creatorId } = req.params;

    const activitySales = await ActivitySales.aggregate([
      {
        $lookup: {
          from: "activities",
          localField: "activityId",
          foreignField: "_id",
          as: "activity",
        },
      },
      {
        $unwind: "$activity",
      },
      {
        $match: {
          "activity.creatorId": mongoose.Types.ObjectId(creatorId),
        },
      },
    ]);

    res.status(200).json(activitySales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyItinerarySales = async (req, res) => {
  try {
    const { creatorId } = req.params;

    const itinerarySales = await ItinerarySales.aggregate([
      {
        $lookup: {
          from: "itineraries",
          localField: "itineraryId",
          foreignField: "_id",
          as: "itinerary",
        },
      },
      {
        $unwind: "$itinerary",
      },
      {
        $match: {
          "itinerary.creatorId": mongoose.Types.ObjectId(creatorId),
        },
      },
    ]);

    res.status(200).json(itinerarySales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyProductSales = async (req, res) => {
  try {
    const { creatorId } = req.params;

    const productSales = await ProductSales.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $match: {
          "product.creatorId": mongoose.Types.ObjectId(creatorId),
        },
      },
    ]);

    res.status(200).json(productSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductSalesDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const myProduct = await Product.findById(productId);

    // console.log(availableQuantity);
    // console.log(availableQuantity.quantity);

    const productSales = await ProductSales.find({ productId: productId });

    res.status(200).json({
      availableQuantity: myProduct.quantity,
      productSales,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error getting products sales",
      error: error.message,
    });
  }
};

module.exports = {
  getAllSales,
  getMyActivitySales,
  getMyItinerarySales,
  getMyProductSales,
  getProductSalesDetails,
};
