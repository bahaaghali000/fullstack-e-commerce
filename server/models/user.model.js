const mongoose = require("mongoose");
const bcrypt=require('bcryptjs')



const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dtvbuahbi/image/upload/v1699753823/xbzia3zstxtx8krrbbkh.png",
    },
    bio: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    city: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// hashing password
userSchema.pre("save", async function(next) {
  const salt=await bcrypt.genSaltSync(10);
  let hashed = await bcrypt.hash(this.password, salt);

  this.password = hashed

  next()

} )

const User = mongoose.model("User", userSchema);

module.exports = User;
