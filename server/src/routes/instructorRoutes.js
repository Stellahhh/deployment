const express = require("express");
const instructorController = require("./../controllers/instructorController");
const router = express.Router();

router.route("/").get(instructorController.getAllInstructors);

module.exports = router;
