const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../utils/authService");
const { getAccessTokenExpiryDate } = require("../utils/config");

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

module.exports = { verifyToken };
