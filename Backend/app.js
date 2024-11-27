const multer = require("multer");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const Amadeus = require("amadeus");
require("dotenv").config();

const adminRoutes = require("./routes/Admin");
const siteRoutes = require("./routes/Site");
const activityRoutes = require("./routes/Activity");
const itineraryRoutes = require("./routes/Itinerary");
const categoryRoutes = require("./routes/Category");
const tagRoutes = require("./routes/Tag");
const userRoutes = require("./routes/User");
const advertiserRoutes = require("./routes/Advertiser");
const touristRoutes = require("./routes/Tourist");
const tourGuideRoutes = require("./routes/TourGuide");
const PromoCodeRoutes = require("./routes/PromoCode");
const tourismGovernorRoutes = require("./routes/TourismGovernor");
const productRoutes = require("./routes/Product");
const sellerRoutes = require("./routes/Seller");
const complaintRoutes = require("./routes/Complaint");
const flightRoutes = require("./routes/flight");
const AdvertiserController = require("./controllers/Advertiser");
const SellerController = require("./controllers/Seller");
const TourGuideController = require("./controllers/TourGuide");
const tripRoutes = require("./routes/Trip");
const saleRoutes = require("./routes/Sale");
const hotelRoutes = require("./routes/Hotel");

//Set memory preference to be RAM
const upload = multer({ storage: multer.memoryStorage() });

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB, and prevent connecting to the database during testing
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });
}

app.post(
  "/advertiser/upload/:id",
  upload.fields([
    { name: "idCardImage", maxCount: 1 },
    { name: "taxationRegistryCardImage", maxCount: 1 },
  ]),
  AdvertiserController.addAdvertiserDocuments
);

app.post(
  "/seller/upload/:id",
  upload.fields([
    { name: "idCardImage", maxCount: 1 },
    { name: "taxationRegistryCardImage", maxCount: 1 },
  ]),
  SellerController.addSellerDocuments
);

app.post(
  "/tourGuide/upload/:id",
  upload.fields([
    { name: "idCardImage", maxCount: 1 },
    { name: "certificateImage", maxCount: 1 },
  ]),
  TourGuideController.addTourGuideDocuments
);

//User routes
app.use("/user", userRoutes);

//Advertiser routes
app.use("/advertiser", advertiserRoutes);

// Admin routes
app.use("/admin", adminRoutes);

// Site routes
app.use("/site", siteRoutes);

// Activity routes
app.use("/activity", activityRoutes);

// Itinerary routes
app.use("/itinerary", itineraryRoutes);

//seller routes
app.use("/seller", sellerRoutes);

// Activities' categories routes
app.use("/category", categoryRoutes);

// Product routes
app.use("/product", productRoutes);

// Activities' tags routes
app.use("/tag", tagRoutes);

//Tourist routes
app.use("/tourist", touristRoutes);

//TourGuide routes
app.use("/tourGuide", tourGuideRoutes);

// Tourism Governor routes
app.use("/tourism-governor", tourismGovernorRoutes);

// Complaint routes
app.use("/complaint", complaintRoutes);

// flight routes
app.use("/flight", flightRoutes);

// Trip routes
app.use("/trip", tripRoutes);

// PromoCode routes
app.use("/PromoCode", PromoCodeRoutes);

// Sale routes
app.use("/sale", saleRoutes);

// Hotel routes
app.use("/hotel", hotelRoutes);


//To work with pictures

// Fallback route for unknown endpoints
app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong",
    error: err.message,
  });
});

// Start the server
let PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV === "test") {
  PORT = 0; // Finds first available port, to prevent conflicts when running test suites in parallel
}

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
