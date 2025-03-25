const express = require("express");
const router = express.Router();
const leadInterationController = require("../controllers/leadsInteractionController");
const isLogged = require("../middleware/auth");

router.get("/", isLogged, leadInterationController.getInterations);
router.get("/:id", isLogged, leadInterationController.getInterationById);
router.post("/", isLogged, leadInterationController.createInteration);
router.put("/:id", isLogged, leadInterationController.updateInteration);
router.delete("/:id", isLogged, leadInterationController.deleteInteration);

module.exports = router;
