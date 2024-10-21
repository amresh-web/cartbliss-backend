const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../utils/authService");
const { getAccessTokenExpiryDate } = require("../utils/config");

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

module.exports = { refreshToken };
