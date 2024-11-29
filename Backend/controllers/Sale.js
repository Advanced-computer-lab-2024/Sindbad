const mongoose = require("mongoose");
const Sale = require("../models/Sale");
const Product = require("../models/Product");
const Itinerary = require("../models/Itinerary");
const Activity = require("../models/Activity");
const Flight = require("../models/Flight");
const Hotel = require("../models/Hotel");
const Trip = require("../models/Trip");
const Admin = require("../models/Admin");

const getItemName = async (type, itemId) => {
  let item, itemName;
  switch (type) {
    case "Product":
    case "Itinerary":
    case "Activity":
    case "Trip":
      item = await eval(`${type}`).findById(itemId);
      itemName = item.name;
      break;
    case "Flight":
      item = await Flight.findById(itemId);
      itemName = `Flight ${item.FlightNumber} Booking`;
      break;
    case "Hotel":
      item = await Hotel.findById(itemId);
      itemName = `${item.hotelName} Hotel Booking`;
      break;
    default:
      itemName = "N/A";
  }
  return itemName;
};

const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    const updatedSales = await Promise.all(
      sales.map(async (sale) => {
        let item,
          itemName = await getItemName(sale.type, sale.itemId),
          revenue = sale.totalPrice * 0.1;
        if (sale.type === "Product") {
          item = await Product.findById(sale.itemId);
          revenue = (await Admin.exists({ _id: item.creatorId }))
            ? sale.totalPrice
            : revenue;
        }
        return { ...sale.toObject(), revenue, itemName };
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
    const modelMap = {
      product: Product,
      itinerary: Itinerary,
      activity: Activity,
    };
    const Model = modelMap[type];

    if (!Model) return res.status(400).json({ message: "Invalid type" });

    const items = await Model.find(
      { creatorId: new mongoose.Types.ObjectId(creatorId) },
      { _id: 1 }
    );

    const itemIds = items.map((item) => item._id);
    const typeCapitalCase = type.charAt(0).toUpperCase() + type.slice(1);

    const sales = await Sale.find({
      itemId: { $in: itemIds },
      type: typeCapitalCase,
    });

    const updatedSales = await Promise.all(
      sales.map(async (sale) => ({
        ...sale.toObject(),
        itemName: await getItemName(sale.type, sale.itemId),
      }))
    );

    res.status(200).json(updatedSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductSalesDetails = async (req, res) => {
  try {
    const productId = req.params.id;
    const myProduct = await Product.findById(productId);

    const productSales = await Sale.find({
      itemId: productId,
      type: "Product",
    });

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
