const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const usersRoute = require("./routes/user.route");
const productsRoute = require("./routes/product.route");
const cloudinary = require("cloudinary").v2;

const app = express();

cloudinary.config({
  cloud_name: "dtvbuahbi",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

app.use(express.json({ limit: Infinity }));
app.use(cors());
app.use("/api/user", usersRoute);
app.use("/api/products", productsRoute);

app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

const main = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("server is connected");
};

main();

app.listen(process.env.PORT || 1000, () => {
  console.log("listening on port " + process.env.PORT);
});
