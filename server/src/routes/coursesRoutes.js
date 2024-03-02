const express = require("express");
const courseController = require("./../controllers/courseController");
const router = express.Router();

router.route("/").get(courseController.getAllCourses);
router.route("/keyword").get(courseController.getCoursesByKeyWord);
router.route("/dept").get(courseController.getCoursesByDepartment);
router.route("/inst").get(courseController.getCoursesByInstructor);
router.route("/id").get(courseController.getCoursesById);

module.exports = router;
