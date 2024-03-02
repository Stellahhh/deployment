const express = require("express");
const deptController = require("./../controllers/deptController");
const router = express.Router();

router.route("/").get(deptController.getAllDepartments);

module.exports = router;
