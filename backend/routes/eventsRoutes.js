const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

router.get("/", eventsController.getEventsData);
router.get("/:id", eventsController.getEventsData);

module.exports = router;
