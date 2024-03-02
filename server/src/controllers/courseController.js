const { supabase } = require("./../db/index");

exports.getAllCourses = async (req, res) => {
  try {
    const { data, error } = await supabase.from("uniqueCourses").select();

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
};

exports.getCoursesByKeyWord = async (req, res) => {
  try {
    if (req.query.keyword.trim().length !== 0) {
      const { data, error } = await supabase
        .from("uniqueCourses")
        .select("*")
        .ilike("Title", `%${req.query.keyword}%`);

      res.status(200).json({
        status: "success",
        results: data,
      });
      return data;
    }
    throw err;
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getCoursesByDepartment = async (req, res) => {
  //console.log(req.query.department);
  try {
    let result = [];
    if (req.query.department === "All") {
      const { data, error } = await supabase.from("uniqueCourses").select();
      result = data;
    } else {
      const { data: rawData, error } = await supabase
        .from("uniqueCourses")
        .select()
        .eq("Department", `${req.query.department}`);

      for (let i = 0; i < rawData.length; i++) {
        let curr = rawData[i];

        const { data: descData, error } = await supabase
          .from("allCourses")
          .select()
          .eq("course_id", `${curr.id}`);

        curr.Description = descData[0].Description;
        //console.log(curr);
        result = [...result, curr];
      }
      //console.log(rawData);
    }

    res.status(200).json({
      status: "success",
      results: result,
    });
    return result;
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getCoursesByInstructor = async (req, res) => {
  //console.log(req.query.department);
  try {
    let result = [];
    if (req.query.instructor.trim().length === 0) {
      throw err;
    }
    if (req.query.instructor === "Any") {
      const { data, error } = await supabase.from("uniqueCourses").select();
      result = data;
    } else {
      const { data, error } = await supabase
        .from("allCourses")
        .select()
        .ilike("InstructorsFullName", `${req.query.instructor}`);

      const uniqueObjectsMap = new Map();
      data.forEach((obj) => {
        uniqueObjectsMap.set(obj.course_id, obj);
      });

      // Convert the map values (unique objects) back to an array
      const uniqueArray = Array.from(uniqueObjectsMap.values());
      for (let i = 0; i < uniqueArray.length; i++) {
        let curr = uniqueArray[i];

        const { data: val, error } = await supabase
          .from("uniqueCourses")
          .select()
          .eq("id", `${curr.course_id}`);

        //console.log(val);

        curr.Title = val[0].Title;
        curr.Department = val[0].Department;
        curr.OfferingName = val[0].OfferingName;
        curr.Credits = val[0].Credits;
        //console.log(curr);
        result = [...result, curr];
      }
      //console.log(result);
    }

    res.status(200).json({
      status: "success",
      results: result,
    });
    return result;
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getCoursesById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("allCourses")
      .select("*")
      .eq("course_id", req.query.id);

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
};
