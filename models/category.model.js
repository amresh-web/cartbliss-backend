const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const BrandSchems = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const ModelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
  specifications: {
    processor: String,
    ram: String,
    storage: String,
    color: String,
    price: Number,
    discount_price: Number,
    discount_percentage: String,
  },
  images: [{ type: String, required: true }],
});

const Category = mongoose.model("Category", CategorySchema);
const Brand = mongoose.model("Brand", BrandSchems);
const Model = mongoose.model("Model", ModelSchema);

module.exports = { Category, Brand, Model };
