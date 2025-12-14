const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const imagekit = require("../service/Imagekit.service");


async function registerUser(req, res) {
  try {
   const { username, email, password, avatar, bio } = req.body;
;

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
  avatar: avatar || null,
  bio: bio || "",
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

// Login Controller
// Login Controller
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create token (correct way)
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set cookie
    res.cookie("token", token, {
  httpOnly: true,
  secure: true,      // Render = HTTPS
  sameSite: "none",  // Cross-site cookie
});


    // Return FULL user data
    const fullUser = await userModel
      .findById(user._id)
      .select("-password");

    res.json({
      message: "Login successful",
      user: fullUser,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}


async function getUserMe(req, res) {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    res.json({ user });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
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
    logoutUser,
    getUserMe
}