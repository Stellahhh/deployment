const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase client
/*const supabaseUrl = "https://wlutceuwzssoambbvczt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsdXRjZXV3enNzb2FtYmJ2Y3p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzODYwOTAsImV4cCI6MjAyMzk2MjA5MH0.Y8y-TKp7vy7bu5SGbKzjVNk5DFibPI8AvFP0YDzDo7M";
const supabase = createClient(supabaseUrl, supabaseKey);*/

const { supabase } = require("./../db/index");


exports.getFavoriteCourses = async (req, res) => {
    try {
        const { data, error } =  await supabase
        .from('favoriteCourse')
        .select('uniqueCourses(*)')
        .eq('user_id', req.query.user_id)

        const flattenedCourses = data.map(course => course.uniqueCourses);

      
        res.status(200).json({
          status: "success",
          results: flattenedCourses,
        });
        return flattenedCourses;
        
      } catch (err) {
        res.status(404).json({
          status: "fail",
          message: err,
        });
      }

}


exports.addFavoriteCourse = async (req, res) => {
    try {
        const { data, error } =  await supabase
        .from('favoriteCourse')
        .insert([
            { user_id: req.query.user_id, course_id: req.query.course_id},
          ])
        .select()
        res.status(200).json({
          status: "success",
          results: data,
        });
        return data;
      } catch (err) {
        res.status(404).json({
          status: "fail",
          message: err,
        });
      }
}

exports.deleteFavoriteCourse = async (req, res) => {
    try {
        const { data, error } =  await supabase
        .from('favoriteCourse')
        .delete()
        .eq('user_id', req.query.user_id)
        .eq('course_id', req.query.course_id)
        res.status(200).json({
          status: "success",
          results: req.query.course_id,
        });
        return req.query.course_id;
      } catch (err) {
        res.status(404).json({
          status: "fail",
          message: err,
        });
      }

}

