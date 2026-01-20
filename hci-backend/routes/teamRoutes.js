const express = require("express");
const router = express.Router();
const TeamController = require("../controllers/teamController");

router.get("/", TeamController.getAllTeamMembers);
router.get("/:id", TeamController.getTeamMemberById);

module.exports = router;
