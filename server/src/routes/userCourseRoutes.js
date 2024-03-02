const express = require("express");
const userCourseController = require("./../controllers/userCourseController");
const router = express.Router();

router.route("/")
    .get(userCourseController.getFavoriteCourses)
    .post(userCourseController.addFavoriteCourse)
    .delete(userCourseController.deleteFavoriteCourse)

module.exports = router;