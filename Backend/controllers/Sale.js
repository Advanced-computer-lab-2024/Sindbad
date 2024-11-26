const mongoose = require("mongoose");
const Sale = require("../models/Sale");
const Product = require("../models/Product");
const Itinerary = require("../models/Itinerary");
const Activity = require("../models/Activity");
const Admin = require("../models/Admin");

const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find();

    const updatedSales = await Promise.all(
      sales.map(async (sale) => {
        let item;
        let revenue = sale.totalPrice * 0.1;
        if (sale.type === "Product") {
          item = await Product.findById(sale.itemId);
          const isAdmin = await Admin.exists({ _id: item.creatorId });
          revenue = isAdmin ? sale.totalPrice : revenue;
        }

        return { ...sale.toObject(), revenue };
      })
    );

    res.status(200).json(updatedSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMySales = async (req, res) => {
  try {
    const { creatorId, type } = req.params;

    let items;
    if (type === "Product") {
      items = await Product.find({ creatorId: new mongoose.Types.ObjectId(creatorId) }, { _id: 1 });
    } else if (type === "Itinerary") {
      items = await Itinerary.find({ creatorId: new mongoose.Types.ObjectId(creatorId) }, { _id: 1 });
    } else if (type === "Activity") {
      items = await Activity.find({ creatorId: new mongoose.Types.ObjectId(creatorId) }, { _id: 1 });
    }

    const itemIds = items.map((item) => item._id);

    const sales = await Sale.find({
      itemId: { $in: itemIds },
      type: type,
    });

    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductSalesDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const myProduct = await Product.findById(productId);

    const productSales = await Sale.find({ itemId: productId, type: "Product" });

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
  getMySales,
  getProductSalesDetails,
};
