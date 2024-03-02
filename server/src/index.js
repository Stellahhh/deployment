const express = require("express");
const app = express();
const { PORT, CLIENT_URL } = require("./constants");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cors = require("cors"); // used to communicate with client
const courseRouter = require("./routes/coursesRoutes");

const deptRouter = require("./routes/deptRoutes");
const instructorRouter = require("./routes/instructorRoutes");
const userCourseRouter = require("./routes/userCourseRoutes");
const userRouter = require("./routes/usersRoutes");

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());

// routes
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/departments", deptRouter);
app.use("/api/v1/instructors", instructorRouter);
app.use("/api/v1/followCourse", userCourseRouter);
app.use("/api/v1/users", userRouter);

app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/favoriteCourse", userCourseRouter);



const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`The app is running at https://localhost:${PORT}`);
        });
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
};


appStart();

module.exports = app;