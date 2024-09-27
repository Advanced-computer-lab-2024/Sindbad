const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const Admin = require("./models/adminModel");
const adminRoutes = require("./routes/adminRoutes");
const activityRoutes = require("./routes/activityRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
require("dotenv").config();

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.error("Database connection error:", err);
	});

// Session configuration (necessary for passport-local-mongoose)
app.use(
	session({
		secret: process.env.SECRET_KEY,
		resave: false,
		saveUninitialized: false,
	})
);

// Initialize Passport.js for handling user authentication
app.use(passport.initialize());
app.use(passport.session());

passport.use(Admin.createStrategy());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

// Admin routes
app.use("/admin", adminRoutes);

// Activity routes
app.use("/activity", activityRoutes);

// Activities' categories routes
app.use("/category", categoryRoutes);

// Fallback route for unknown endpoints
app.use((req, res, next) => {
	res.status(404).json({ message: "Endpoint not found" });
});

// Global error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: "Something went wrong", error: err.message });
});

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
