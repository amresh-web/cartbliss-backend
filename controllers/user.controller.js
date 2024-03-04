const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "apisecretkey";

class UserController {
  addUser = async (req, res) => {
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
    } = new User(req.body);
    try {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const result = await User.create({
        fullname: fullname,
        email: email,
        password: hashPassword,
        username: username,
        phone: phone,
        address: address,
        city: city,
        state: state,
        zip: zip,
      });

      const token = jwt.sign(
        { email: result.email, id: result._id },
        SECRET_KEY
      );
      res.json({
        status: 201,
        message: "User added successfully",
        data: result,
        token: token,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  signin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const existingUser = await User.findOne({ email: email });
      if (!existingUser) {
        return res.status(404).json({ message: "User not found " });
      }

      const matchPassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!matchPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        SECRET_KEY
      );
      res.json({
        status: 201,
        message: "Login successful",
        data: existingUser,
        token: token,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

module.exports = UserController;
