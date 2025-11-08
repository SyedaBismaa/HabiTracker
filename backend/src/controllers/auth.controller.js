const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    // check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User Already Exists try using different email .",
      });
    }

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user: { ...user._doc, password: undefined }, // hide password in response
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

async function loginUser(req,res) {
     try {
    const { email, password } = req.body;

    const isUserExist = await userModel.findOne({ email });
    if (!isUserExist) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    // compare hashed password
    const validPass = await bcrypt.compare(password, isUserExist.password);
    if (!validPass) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { id: isUserExist._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "User Logged In Successfully",
      user: {
        username: isUserExist.username,
        email: isUserExist.email,
        id: isUserExist._id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
    
}


async function getUser(req,res) {
      const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({
      message: "User Not Found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    res.status(200).json({
      message: "User Found",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid Token",
    });
  }
}

async function logoutUser(req,res) {
     res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    message: "User Logged Out Successfully",
  });
}
module.exports={
    registerUser,
    loginUser,
    getUser,
    logoutUser
}