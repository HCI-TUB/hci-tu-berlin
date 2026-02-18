const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");

router.get("/:slug", pageController.getPageData);

module.exports = router;
