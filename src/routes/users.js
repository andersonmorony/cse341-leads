const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isLogged = require("../middleware/auth");

router.get("/", isLogged, userController.getUsers);
router.get("/:id", isLogged, userController.getUserById);
router.post("/", isLogged, userController.createUser);
router.put("/:id", isLogged, userController.updateUser);
router.delete("/:id", isLogged, userController.deleteUser);

module.exports = router;
