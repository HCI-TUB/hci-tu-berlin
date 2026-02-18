const express = require("express");
const router = express.Router();
const GalleryController = require("../controllers/galleryController");

router.get("/:slug", GalleryController.getGalleryData);

module.exports = router;
