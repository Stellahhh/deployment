// const User = require('../models/User');
const { supabase } = require("./../db/index");

// Signup controller
const signup = async (req, res) => {
  try {
    const { email, password, first_name, last_name, nickname } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: first_name,
          last_name: last_name,
          nickname: nickname,
        },
      },
    });
    if (error) {
      return res.status(error.status).json({
        status: "fail",
        message: error,
      });
    } else {
      return res.status(200).json({
        status: "success",
        results: data,
      });
    }
  } catch (error) {
    res.status(error.status).json({
      status: "fail",
      message: error,
    });
  }
};

// Signin controller
const signin = async (req, res) => {
  console.log("called in backend")
  console.log(req.body)

  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return res.status(error.status).json({
        status: "fail",
        message: error,
      });
    } else {
      // console.log(data.user)
      return res.status(200).json({
        status: "success",
        results: data,
      });

    }
  } catch (error) {

    res.status(error.status).json({
      status: "fail",
      message: error,
    });
  }
};

module.exports = { signup, signin };
