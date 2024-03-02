const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

// router.route("/").get(courseController.getAllCourses);
router.route("/signup").post(userController.signup);
router.route("/signin").post(userController.signin);
// router.route("/inst").get(courseController.getCoursesByInstructor);
// router.route("/id").get(courseController.getCoursesById);

module.exports = router;