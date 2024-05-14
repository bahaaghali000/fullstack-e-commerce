const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const rateLimit = require("express-rate-limit");
const usersRoute = require("./routes/user.route");
const googleRoute = require("./routes/goole.route.js");
const productsRoute = require("./routes/product.route");
const favoriteRoute = require("./routes/favorite.route");
const ratingRoute = require("./routes/rating.route");
const cartRoute = require("./routes/cart.route");
const cloudinary = require("cloudinary").v2;
const passportSetup = require("./passport");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");

const limiter = rateLimit({
  windowMs: process.env.LIMIT_TIME,
  limit: process.env.LIMIT_REQUESTS,
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: async (req, res) => {
    return "Too many requests, please try again later.";
  },
  statusCode: 429,
});

const app = express();

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: process.env.COOKIE_SECURE,
    },
  })
);

// setup passport
app.use(passport.initialize());
app.use(passport.session());

cloudinary.config({
  cloud_name: "dtvbuahbi",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

// Apply the rate limiting middleware to all requests.
app.use(limiter);
app.use(express.json({ limit: Infinity }));
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

app.use("/api/user", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/favorite", favoriteRoute);
app.use("/api/rating", ratingRoute);
app.use("/auth", googleRoute);

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
