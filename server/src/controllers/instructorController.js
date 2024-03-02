const { supabase } = require("./../db/index");

exports.getAllInstructors = async (req, res) => {
  try {
    const { data, error } = await supabase.from("instructors2").select();
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
