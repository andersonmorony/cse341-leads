const express = require("express");
const router = express.Router();

// Routes
const userRouter = require("./users");
const auth = require('./auth');
const interationRouter = require("./interation");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.use("/users", userRouter);
router.use("/auth", auth);
router.use("/interation", interationRouter);


module.exports = router;