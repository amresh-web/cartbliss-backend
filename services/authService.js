const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_EXPIRE_TIME,
  REFRESH_TOKEN_EXPIRE_TIME,
} = require("../config/config");

const generateAccessToken = (userId) => {
  console.log("Generating access token for user:", process.env.JWT_EXPIRE_IN);
  console.log(process.env.ACCESS_SECRET_KEY);
  try {
    return jwt.sign({ userId }, process.env.ACCESS_SECRET_KEY, {
      expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
    });
  } catch (err) {
    console.error("Error generating access token:", err);
    throw new Error("Failed to generate access token");
  }
};

const generateRefreshToken = (userId) => {
  console.log("Generating refresh token for user:", userId);
  try {
    return jwt.sign({ userId }, process.env.ACCESS_SECRET_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
    });
  } catch (err) {
    console.error("Error generating refresh token:", err);
    throw new Error("Failed to generate refresh token");
  }
};

module.exports = { generateAccessToken, generateRefreshToken };
