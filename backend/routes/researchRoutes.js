const express = require("express");
const router = express.Router();
const researchController = require("../controllers/researchController");

router.get("/", researchController.getResearchData);
router.get("/:id", researchController.getResearchData);

module.exports = router;
