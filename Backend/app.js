const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

const Admin = require("./models/adminModel");
const adminRoutes = require("./routes/adminRoutes");
const siteRoutes = require("./routes/siteRoutes");
const activityRoutes = require("./routes/activityRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const tagRoutes = require("./routes/tagRoutes");
const userRoutes = require("./routes/user-routes");

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

// TODO: Remove this stuff, we'll be using client-side hashing
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

app.use("/user", userRoutes);

// Admin routes
app.use("/admin", adminRoutes);

// Site routes
app.use("/site", siteRoutes);

// Activity routes
app.use("/activity", activityRoutes);

// Activities' categories routes
app.use("/category", categoryRoutes);

// Activities' tags routes
app.use("/tag", tagRoutes);

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
