const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/error", (req, res) => {
  res.send("Unknown Error");
});

router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) {
          return next(err);
        }
    
        req.session = null; // limpa a sessão
        res.redirect("/");
      });
});

module.exports = router;
