const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
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
const tourismGovernorRoutes = require("./routes/TourismGovernor");
const productRoutes = require("./routes/Product");
const sellerRoutes = require("./routes/Seller");

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
	origin: 'http://localhost:5173',
	methods: 'GET,POST,PUT,DELETE',
	credentials: true,
}));

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


app.use("/user", userRoutes);

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
