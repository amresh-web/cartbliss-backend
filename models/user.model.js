const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: [true, "Full name is rquired"] },
  username: { type: String, required: [true, "Username is required"] },
  phone: { type: Number, required: [true, "Phone number is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  address: { type: String, required: [true, "Address is required"] },
  city: { type: String, required: [true, "City is required"] },
  state: { type: String, required: [true, "State is required"] },
  zip: { type: Number, required: [true, "Zip"] },
});

module.exports = mongoose.model("User", userSchema);
