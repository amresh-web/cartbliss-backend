const express = require("express");
const UserController = require("../controllers/user.controller");

const userRouter = express.Router();
const userController = new UserController();

userRouter.post("/adduser", userController.addUser);

module.exports = userRouter;
