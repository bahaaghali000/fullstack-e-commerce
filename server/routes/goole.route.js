const router = require("express").Router();
const passport = require("passport");
const { continueWithGoogle } = require("../controllers/auth.controller");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.FRONTEND_LOGIN_URL,
  }),
  continueWithGoogle
);

router.get("/logout", (req, res, next) => {
  res.clearCookie("access_token");

  req.logout(function (err) {
    if (err) return next(err);

    res.redirect(process.env.FRONTEND_BASE_URL);
  });
});

module.exports = router;
