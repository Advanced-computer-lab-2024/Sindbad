const Tourist = require("../models/Tourist");
const TourGuide = require("../models/TourGuide");
const Advertiser = require("../models/Advertiser");
const Activities = require("../models/Activity");
const Itinerary = require("../models/Itinerary");
const Products = require("../models/Product");
const Complaint = require("../models/Complaint");
const Seller = require("../models/Seller");
const Admin = require("../models/Admin");
const TourismGovernor = require("../models/TourismGovernor");
const nodemailer = require("nodemailer");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const models = {
  tourist: Tourist,
  tourguide: TourGuide,
  tourismgovernor: TourismGovernor,
  advertiser: Advertiser,
  seller: Seller,
  admin: Admin,
};

const isAcceptedmodels = {
  tourguide: TourGuide,
  advertiser: Advertiser,
  seller: Seller,
};

const defaultFields = {
  tourist: {
    wallet: 0,
    bookmarks: [],
    loyaltyPoints: 0,
    level: 1,
    xpPoints: 0,
    Notifications: [],
    wishlist: [],
    cart: [],
    addresses: [],
    preferences: [],
    isRequestedAccountDeletion: false,
  },
  advertiser: {
    isAccepted: null,
    createdActivities: [],
    createdIterinaries: [],
    createdHistoricalPlaces: [],
    isRequestedAccountDeletion: false,
  },
  seller: {
    isAccepted: null,
    products: [],
    isRequestedAccountDeletion: false,
  },
  tourguide: {
    isAccepted: null,
    isRequestedAccountDeletion: false,
  },
  admin: {},
  tourismgovernor: {},
};

const UserController = {
  signUp: async (req, res) => {
    try {
      const { email, username, password, role, ...userData } = req.body;

      if (!role) {
        throw new Error("Role is required");
      }

      // Check for unique email and username
      const isUnique = await UserController.isUniqueUsername(username);
      if (!isUnique) {
        throw new Error("Username already exists");
      }

      // Get the model based on role
      const Model = models[role.toLowerCase()];
      if (!Model) {
        throw new Error("Invalid role");
      }

      // Combine user-provided data with default fields for the role
      const roleSpecificData = {
        ...defaultFields[role.toLowerCase()],
        ...userData,
      };

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user instance and save it
      const user = new Model({
        email,
        username,
        passwordHash: hashedPassword,
        ...roleSpecificData,
      });

      await user.save();

      return res
        .status(201)
        .json({ message: "User created successfully", user });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Sign up failed", error: error.message });
    }
  },

  getUserRole: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        throw new Error("ID is required");
      }

      // Loop through models to find the user by ID
      for (const [role, model] of Object.entries(models)) {
        const user = await model.findById(id);
        if (user) {
          if (role === "tourguide") {
            return res.status(200).json({ role: "tourGuide" });
          } else if (role === "tourismgovernor") {
            return res.status(200).json({ role: "tourismGovernor" });
          } else {
            return res.status(200).json({ role });
          }
        }
      }

      return res.status(404).json({ message: "User not found" });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to get user type",
        error: error.message,
      });
    }
  },

  isUniqueUsername: async (username) => {
    // Check all models for unique username
    for (let model in models) {
      const existingUser = await models[model].findOne({ username }).exec();
      if (existingUser) {
        return false;
      }
    }
    return true;
  },

  getAllUsers: async (req, res) => {
    try {
      const results = await Promise.all(
        Object.entries(models).map(async ([role, model]) => {
          const users = await model.find({
            $or: [
              { isAccepted: { $exists: false } },
              { isAccepted: { $ne: null } },
            ],
          });
          return users.map((user) => ({ ...user._doc, role }));
        })
      );

      const combinedUsers = results.flat();
      return res.status(200).json(combinedUsers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },

  getAllPendingUsers: async (req, res) => {
    try {
      const results = await Promise.all(
        Object.entries(isAcceptedmodels).map(async ([role, model]) => {
          const users = await model.find({ isAccepted: null });
          r =
            role === "tourguide"
              ? "Tour Guide"
              : role.charAt(0).toUpperCase() + role.slice(1);
          return users.map((user) => ({ ...user._doc, role: r }));
        })
      );

      const combinedUsers = results.flat();
      return res.status(200).json(combinedUsers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  checkDeletion: async (req, res) => {
    try {
      const { id } = req.params;
      const { role } = req.body;

      if (role.toLowerCase() == "advertiser") {
        const currentDate = new Date();

        //get number of future actvities which head count ! = 0
        const activityCount = await Activities.countDocuments({
          creatorId: id,
          headCount: { $ne: 0 }, // Only count activities where headCount is not equal to 0
          dateTime: { $gt: currentDate }, // Only future activities
        });

        if (activityCount != 0) {
          return res.status(404).json({
            canDelete: false,
            message: "Activity has bookings.",
          });
        }

        // All activities are deletable
        return res.status(200).json({ canDelete: true });
      } else if (role.toLowerCase() == "tourguide") {
        //check if itenirary is still running aka ana b3d el start date bas abl el end date, can i delete?
        const currentDate = new Date();

        const itineraries = await Itinerary.find({
          creatorId: id,
        });
        if (!itineraries) {
          return res.status(200).json({ canDelete: true });
        }
        for (const itinerary of itineraries) {
          const totalHeadCount = itinerary.availableDatesTimes.reduce(
            (sum, date) => {
              return date.dateTime >= currentDate ? sum + date.headCount : sum;
            },
            0
          );

          if (totalHeadCount > 0) {
            // Activity found, return success response or perform the deletion if needed
            return res.status(403).json({
              canDelete: false,
              message: "itinerary has bookings.",
            });
          }
        }
        return res.status(200).json({ canDelete: true });
      } else {
        return res.status(200).json({ canDelete: true });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message:
          "An error occurred while checking if an account can be deleted.",
      });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    console.log(req.body);

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    try {
      const Model = models[role.toLowerCase()];
      if (!Model) {
        throw new Error("Invalid role");
      }

      let deletionResult;

      if (role.toLowerCase() == "advertiser") {
        deletionResult = await Activities.deleteMany({ creatorId: id });
      } else if (role.toLowerCase() == "tourguide") {
        deletionResult = await Itinerary.deleteMany({ creatorId: id });
      } else if (role.toLowerCase() == "seller") {
        deletionResult = await Products.deleteMany({ seller: id });
      } else if (role.toLowerCase() == "tourist") {
        deletionResult = await Complaint.deleteMany({ creatorId: id });
      }
      const userDeletionResult = await Model.findByIdAndDelete(id);

      return res.status(200).json({
        message: "User deleted successfully",
        deletedCount: deletionResult ? deletionResult.deletedCount : 0, // Include the count of deleted documents
        userDeleted: userDeletionResult ? true : false, // Indicate if the user was deleted
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateUserPassword: async (req, res) => {
    const { id } = req.params;
    const { role, oldPassword, newPassword } = req.body;
    // console.log(req.body);
    // console.log(req.params);

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }
    if (!oldPassword) {
      return res.status(400).json({ message: "Old Password is required" });
    }
    if (!newPassword) {
      return res.status(400).json({ message: "New Password is required" });
    }

    try {
      const Model = models[role.toLowerCase()];
      if (!Model) {
        throw new Error("Invalid role");
      }

      const user = await Model.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (newPassword.length < 8) {
        return res
          .status(400)
          .json({ message: "New password must be at least 8 characters." });
      }

      if (!(await bcrypt.compare(oldPassword, user.passwordHash))) {
        return res.status(400).json({ message: "Old password is incorrect" });
      }

      if (oldPassword == newPassword) {
        return res.status(400).json({
          message: "Old password and new password cannot be the same!",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      user.passwordHash = hashedPassword;
      await user.save();
      res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  updateUserAcceptance: async (req, res) => {
    const { id } = req.params;
    const { role, isAccepted } = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    try {
      const Model = isAcceptedmodels[role.toLowerCase()];
      if (!Model) {
        throw new Error("Invalid role");
      }

      const user = await Model.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.isAccepted = isAccepted;
      await user.save();
      res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  requestAccountDeletion: async (req, res) => {
    const { id } = req.params;
    const { role, isRequestedAccountDeletion = true } = req.body; // Make the default value true

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    try {
      const Model = models[role.toLowerCase()];
      if (!Model) {
        throw new Error("Invalid role");
      }

      const user = await Model.findById(id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.isRequestedAccountDeletion = isRequestedAccountDeletion;
      await user.save();
      res.json(user);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  forgotPassword: async (req, res) => {
    const { username } = req.body;

    // Validate the email input
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
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

    try {
      // Loop through all models to find the user
      for (const [_, UserModel] of Object.entries(models)) {
        foundUser = await UserModel.findOne({ username }).exec();
        if (foundUser) {
          break; // Exit the loop once the user is found
        }
      }

      // If the user is not found in any model
      if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate a password reset link
      const resetLink = `${process.env.FRONTEND_DOMAIN}/reset-password/${foundUser._id}`;

      // Configure nodemailer with Gmail
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL, // Your Gmail address
          pass: process.env.GMAILPASSWORD, // Your Gmail app password
        },
      });

      // Email options
      const mailOptions = {
        from: process.env.GMAIL,
        to: foundUser.email,
        subject: "Password Reset Request",
        html: `
        <p>Hello ${foundUser.username || "User"},</p>
        <p>We received a request to reset your password. Please click the link below to reset your password:</p>
        <a href="${resetLink}" target="_blank">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Thank you,<br>Sindbad</p>
      `,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      return res
        .status(200)
        .json({ message: "Password reset email sent successfully" });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while processing your request",
        error: error.message,
      });
    }
  },

  resetPassword: async (req, res) => {
    const { newPassword, id } = req.body;

    // console.log("req.body: ", { newPassword, id });

    // Validate the password input
    if (!newPassword) {
      return res.status(400).json({ message: "Password is required" });
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

    try {
      // Loop through all models and find the user in one of the models
      for (const [type, UserModel] of Object.entries(models)) {
        // Use findOne instead of find to get a single user
        foundUser = await UserModel.findOne({ _id: id }).exec();
        if (foundUser) {
          userType = type; // Set the userType when found
          break; // Exit the loop when the user is found
        }
      }

      // console.log("Found user: ", foundUser);

      if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update the user's password
      foundUser.passwordHash = hashedPassword;
      await foundUser.save();

      return res
        .status(200)
        .json({ message: "Password reset successfully", foundUser });
    } catch (error) {
      return res.status(500).json({
        message: "An error occurred while resetting your password",
        error: error.message,
      });
    }
  },
};

module.exports = UserController;
