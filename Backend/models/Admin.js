const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^\S+@\S+\.\S+$/.test(v),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return !/\s/.test(v); // Check if there are no spaces
        },
        message: (props) =>
          `${props.value} contains spaces, which are not allowed!`,
      },
    },
    passwordHash: {
      type: String,
      required: true,
    },
    // profileImageUri: {
    //   public_id: {
    //     type: String,
    //     required: true,
    //   },
    //   url: {
    //     type: String,
    //     required: true,
    //   },
    // },
    // bannerImageUri: {
    //   public_id: {
    //     type: String,
    //     required: true,
    //   },
    //   url: {
    //     type: String,
    //     required: true,
    //   },
    // },
    Notifications: {
      type: [
        {
          title: {
            type: String,
          },
          Body: {
            type: String,
          },
          isSeen: {
            Type: Boolean,
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;

// module.exports = mongoose.model("Admin", AdminSchema);
