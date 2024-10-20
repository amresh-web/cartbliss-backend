const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../services/authService");
const {
  getAccessTokenExpiryDate,
  getRefreshTokenExpiryDate,
} = require("../config/config");

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

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.error("Error verifying access token:", err);
    if (err.name === "TokenExpiredError") {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      console.log(`Refresh token: ${refreshToken}`);
      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.ACCESS_SECRET_KEY
        );
        const newAccessToken = generateAccessToken(decodedRefresh.userId);
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          sameSite: "strict",
          expires: getAccessTokenExpiryDate(),
        });

        req.userId = decodedRefresh.userId;
        next();
      } catch (refreshError) {
        console.error("Error verifying refresh token:", refreshError);
        return res.status(401).json({ message: "Invalid refresh token" });
      }
    } else {
      return res.status(401).json({ message: "Invalid access token" });
    }
  }
};

// Refresh token function
const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(403).json({ message: "Refresh token not provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.ACCESS_SECRET_KEY);
    const newAccessToken = generateAccessToken(decoded.userId);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "strict",
      expires: getAccessTokenExpiryDate(),
    });

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    console.error("Error verifying refresh token refresh:", err);
    return res.status(403).json({ message: "Invalid refresh token" });
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
  verifyToken,
  refreshToken,
  logout,
};
