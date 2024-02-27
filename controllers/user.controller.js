const User = require("../models/user.model");

class UserController {
  addUser = async (req, res) => {
    const user = new User(req.body);
    try {
      const dataSave = await user.save();
      res.json({
        status: 200,
        message: "User added successfully",
        data: dataSave,
      });
    } catch (err) {
      res.json({ message: err.message });
    }
  };
}

module.exports = UserController;
