const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "username is already exsit"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dtvbuahbi/image/upload/v1699753823/xbzia3zstxtx8krrbbkh.png",
    },
    bio: String,
    city: String,
    phoneNumber: String,
    googleId: String,

    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificationCode: String,
    verificationCodeExpires: Date,
  },
  {
    timestamps: true,
  }
);

// hashing password
userSchema.pre("save", async function (next) {
  if (!this.googleId) {
    const salt = await bcrypt.genSaltSync(10);
    let hashed = await bcrypt.hash(this.password, salt);

    this.password = hashed;

    next();
  }
});

userSchema.methods.createRestToken = function () {
  const restToken = crypto.randomBytes(26).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(restToken)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 60 * 60 * 1000; // 1 hour

  return restToken;
};

userSchema.methods.createVerificationCode = function () {
  let verificationCode = "";
  for (let i = 0; i < 4; i++) {
    verificationCode += Math.floor(Math.random() * 10);
  }
  this.verificationCode = verificationCode;
  this.verificationCodeExpires = Date.now() + 60 * 60 * 1000; // 1 hour

  return verificationCode;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
