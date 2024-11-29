const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// Import all user models
const Tourist = require("../models/Tourist");
const Advertiser = require("../models/Advertiser");
const TourGuide = require("../models/TourGuide");
const Seller = require("../models/Seller");
const TourismGovernor = require("../models/TourismGovernor");
const Admin = require("../models/Admin");

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
  const { username, passwordHash } = req.body;

  if (!username || !passwordHash) {
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

  //   // Compare the password
  //   console.log(
  //     `passwordHash: ${passwordHash}\nfoundUser.passwordHash: ${foundUser.passwordHash}`
  //   );

  const match = await bcrypt.compare(passwordHash, foundUser.passwordHash);
  if (!match) return res.status(401).json({ message: "Incorrect password" });

  // Create the access token with user info and userType
  const accessToken = jwt.sign(
    {
      UserInfo: {
        id: foundUser._id,
        username: foundUser.username,
        role: userType,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  // Generate the refresh token
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  // Create a secure cookie with the refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, // Accessible only by the web server
    secure: true, // HTTPS required
    sameSite: "None", // Cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiry time matches refresh token expiry
  });

  // Send the access token with user info
  res.json({ accessToken });
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res.status(401).json({ message: "No JWT token in cookie" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });

      // Dynamically load user model based on userType
      let UserModel;
      switch (decoded.userType) {
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

      // Find the user using the username from the refresh token
      const foundUser = await UserModel.findOne({
        username: decoded.username,
      }).exec();

      if (!foundUser)
        return res.status(401).json({ message: "Cant find user" });

      // Create a new access token
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser._id,
            username: foundUser.username,
            role: decoded.userType,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    })
  );
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
