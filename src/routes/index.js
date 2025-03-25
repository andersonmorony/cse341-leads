const express = require("express");
const router = express.Router();

// Routes
const userRouter = require("./users");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.use("/users", userRouter);

module.exports = router;