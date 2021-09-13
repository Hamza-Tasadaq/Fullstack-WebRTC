const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String },
    phone: { type: String, require: true },
    avatar: {
      type: String,
      get: (avatar) => {
        if (avatar) {
          return `${process.env.BASE_URL}${avatar}`;
        }
        return avatar;
      },
    },
    isActivated: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model("User", userSchema, "users");
