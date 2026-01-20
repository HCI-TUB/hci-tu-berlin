const express = require("express");
const router = express.Router();
const PublicationsController = require("../controllers/publicationsController");

router.get("/", PublicationsController.getAllPublications);

module.exports = router;
