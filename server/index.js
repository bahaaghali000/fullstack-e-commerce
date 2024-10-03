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
const categoryRoute = require("./routes/category.route");
const paymentRoute = require("./routes/stripe.route");
require("./passport");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");

const limiter = rateLimit({
  windowMs: process.env.LIMIT_TIME,
  limit: process.env.LIMIT_REQUESTS,
  standardHeaders: "draft-7", 
  legacyHeaders: false, 
  message: async (req, res) => {
    return "Too many requests, please try again later.";
  },
  statusCode: 429,
});

const app = express();

app.use(
  cookieParser(process.env.COOKIE_SECRET, {
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: process.env.COOKIE_MAXAGE,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
    },
  })
);

// setup passport
app.use(passport.initialize());
app.use(passport.session());

// Apply the rate limiting middleware to all requests.
app.use(limiter);
app.use(express.json({ limit: Infinity }));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(
  cors({
    origin: process.env.FRONTEND_BASE_URL,
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

app.use("/api/v1/user", usersRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/favorite", favoriteRoute);
app.use("/api/v1/rating", ratingRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/auth", googleRoute);

app.get("/", (req, res) => {
  res.send("Welcome to my app");
});

app.use("*", (req, res) => {
  res.send("Not Found");
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(err?.statusCode).json({
    message: err?.message,
    statusCode: err?.statusCode,
    status: err?.status,
  });
});

(async () => {
  await mongoose.connect(process.env.MONGODB_URL_LOCAL);
  console.log("DB is connected");
})();

app.listen(process.env.PORT || 1000, () => {
  console.log("listening on port " + process.env.PORT);
});
