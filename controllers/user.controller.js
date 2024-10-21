const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/authService");
const {
  getAccessTokenExpiryDate,
  getRefreshTokenExpiryDate,
} = require("../utils/config");

const addUser = async (req, res) => {
  const {
    fullname,
    username,
    phone,
    email,
    password,
    address,
    city,
    state,
    zip,
  } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashPassword = bcrypt.hashSync(password);
  const user = new User({
    fullname,
    email,
    password: hashPassword,
    username,
    phone,
    address,
    city,
    state,
    zip,
  });
  try {
    await user.save();
    return res.json({
      status: 200,
      message: "User added successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found " });
    }
    const matchPassword = bcrypt.compareSync(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("User authenticated", existingUser._id);

    const accessToken = generateAccessToken(existingUser._id);
    const refreshToken = generateRefreshToken(existingUser._id);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      expires: getAccessTokenExpiryDate(),
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      expires: getRefreshTokenExpiryDate(),
    });
    return res.status(200).json({
      message: "Successfully Logged In",
      user: {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
      },
    });
  } catch (err) {
    return new Error(err);
  }
};

const getUser = async (req, res) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, "-password");
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ user });
};

const logout = (req, res) => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    sameSite: "Strict",
    expires: new Date(0),
  });

  res.cookie("refreshToken", "", {
    httpOnly: true,
    sameSite: "Strict",
    expires: new Date(0),
  });

  return res.json({ success: true });
};

module.exports = {
  addUser,
  signin,
  getUser,
  logout,
};
