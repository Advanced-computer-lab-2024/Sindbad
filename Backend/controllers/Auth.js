const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Import all user models
const Tourist = require("../models/Tourist");
const Advertiser = require("../models/Advertiser");
const TourGuide = require("../models/TourGuide");
const Seller = require("../models/Seller");
const TourismGovernor = require("../models/TourismGovernor");
const Admin = require("../models/Admin");

const accessTokenExpiryTime = "15m";
const refreshTokenExpiryTime = "7d";

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Define all user models
    const models = {
      tourist: Tourist,
      advertiser: Advertiser,
      tourGuide: TourGuide,
      seller: Seller,
      tourismGovernor: TourismGovernor,
      admin: Admin,
    };

    let foundUser = null;
    let userType = null;

    // Loop through all models and find the user in one of the models
    for (const [type, UserModel] of Object.entries(models)) {
      foundUser = await UserModel.findOne({ username }).exec();
      if (foundUser) {
        userType = type; // Set the userType when found
        break; // Exit the loop when the user is found
      }
    }

    // If the user is not found in any model or is inactive
    if (!foundUser) {
      return res.status(404).json({ message: "Unauthorized, user not found" });
    }

    const match = await bcrypt.compare(password, foundUser.passwordHash);
    if (!match) return res.status(401).json({ message: "Incorrect password" });

    // Create the access token with user info and userType
    const accessToken = jwt.sign(
      {
        id: foundUser._id,
        username: foundUser.username,
        role: userType,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: accessTokenExpiryTime }
    );

    // Generate the refresh token
    const refreshToken = jwt.sign(
      {
        id: foundUser._id,
        role: userType,
        username: foundUser.username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: refreshTokenExpiryTime }
    );

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    // Create a secure cookie with the refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Send the access token with user info
    res.json({
      accessToken: accessToken,
      role: userType,
      id: foundUser._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = async (req, res) => {
  try {
    const cookies = req.cookies;

    // console.log("Cookies: ", cookies);

    if (!cookies?.jwt) {
      return res.status(401).json({ message: "No JWT token in cookie" });
    }

    const refreshToken = cookies.jwt;

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        // console.log("Decoded: ", decoded);

        if (err) {
          console.error("Error: ", err);
          return res.status(426).json({ message: "Forbidden" });
        }

        // Dynamically load user model based on userType
        let UserModel;
        switch (decoded.role) {
          case "tourist":
            UserModel = Tourist;
            break;
          case "advertiser":
            UserModel = Advertiser;
            break;
          case "tourGuide":
            UserModel = TourGuide;
            break;
          case "seller":
            UserModel = Seller;
            break;
          case "tourismGovernor":
            UserModel = TourismGovernor;
            break;
          case "admin":
            UserModel = Admin;
            break;
          default:
            return res.status(400).json({ message: "Invalid user type" });
        }

        const foundUser = await UserModel.findOne({
          username: decoded.username,
        }).exec();

        if (!foundUser)
          return res.status(401).json({ message: "User not found" });

        const accessToken = jwt.sign(
          {
            id: foundUser._id,
            username: foundUser.username,
            role: decoded.role,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: accessTokenExpiryTime }
        );

        res.json({
          accessToken: accessToken,
          role: decoded.role,
          id: foundUser._id,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

module.exports = {
  login,
  refresh,
  logout,
};
