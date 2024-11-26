const mongoose = require("mongoose");
const ProductSales = require("../models/Sales/ProductSale");
const ItinerarySales = require("../models/Sales/ItinerarySale");
const ActivitySales = require("../models/Sales/ActivitySale");
const Product = require("../models/Product");
const Itinerary = require("../models/Itinerary");
const Activity = require("../models/Activity");
const Admin = require("../models/Admin"); // Add this line to import the Admin model

const getAllSales = async (req, res) => {
  try {
    const productSales = await ProductSales.find();
    const itinerarySales = await ItinerarySales.find();
    const activitySales = await ActivitySales.find();

    const updatedProductSales = await Promise.all(
      productSales.map(async (sale) => {
        const product = await Product.findById(sale.productId);
        const isAdmin = await Admin.exists({ _id: product.creatorId });
        const revenue = isAdmin ? 0 : sale.totalPrice * 0.1;
        return { ...sale.toObject(), revenue };
      })
    );

    const updatedItinerarySales = itinerarySales.map((sale) => ({
      ...sale.toObject(),
      revenue: sale.totalPrice * 0.1,
    }));

    const updatedActivitySales = activitySales.map((sale) => ({
      ...sale.toObject(),
      revenue: sale.totalPrice * 0.1,
    }));

    res.status(200).json({
      productSales: updatedProductSales,
      itinerarySales: updatedItinerarySales,
      activitySales: updatedActivitySales,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyActivitySales = async (req, res) => {
  try {
    const { creatorId } = req.params;

    // Step 1: Get activity IDs for the given creator
    const activities = await Activity.find(
      { creatorId: new mongoose.Types.ObjectId(creatorId) },
      { _id: 1 }
    );
    const activityIds = activities.map((activity) => activity._id);

    // Step 2: Get sales for the fetched activity IDs
    const activitySales = await ActivitySales.find({
      activityId: { $in: activityIds },
    });

    res.status(200).json(activitySales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyItinerarySales = async (req, res) => {
  try {
    const { creatorId } = req.params;

    // Step 1: Get itinerary IDs for the given creator
    const itineraries = await Itinerary.find(
      { creatorId: new mongoose.Types.ObjectId(creatorId) },
      { _id: 1 }
    );
    const itineraryIds = itineraries.map((itinerary) => itinerary._id);

    // Step 2: Get sales for the fetched itinerary IDs
    const itinerarySales = await ItinerarySales.find({
      itineraryId: { $in: itineraryIds },
    });

    res.status(200).json(itinerarySales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyProductSales = async (req, res) => {
  try {
    const { creatorId } = req.params;

    // Step 1: Get product IDs for the given creator
    const products = await Product.find(
      { creatorId: new mongoose.Types.ObjectId(creatorId) },
      { _id: 1 }
    );
    const productIds = products.map((product) => product._id);

    // Step 2: Get sales for the fetched product IDs
    const productSales = await ProductSales.find({
      productId: { $in: productIds },
    });

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
