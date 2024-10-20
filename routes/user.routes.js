const express = require("express");
//const UserController = require("../controllers/user.controller");
const {
  addUser,
  signin,
  verifyToken,
  refreshToken,
  getUser,
  logout,
} = require("../controllers/user.controller");
const userRouter = express.Router();
//const userController = new UserController();

userRouter.post("/adduser", addUser);
userRouter.post("/signin", signin);
userRouter.get("/user", verifyToken, getUser);
userRouter.post("/refresh", refreshToken);
userRouter.post("/logout", verifyToken, logout);

module.exports = userRouter;
