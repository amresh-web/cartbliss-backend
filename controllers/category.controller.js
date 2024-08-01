const mongoose = require("mongoose");
const { Category, Brand, Model } = require("../models/category.model");
const multer = require("multer");
const path = require("path");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    return res.json({
      status: 201,
      message: "Category created successfully",
      code: category,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const createBrand = async (req, res) => {
  try {
    const { name, category } = req.body;
    const brand = new Brand({ name, category });
    console.log(brand);
    await brand.save();
    return res.json({
      status: 201,
      message: "Brand created successfully",
      code: brand,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// setup local storage for images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/images/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const createModel = async (req, res) => {
  try {
    const imagePath = req.files.map(
      (file) => `/uploads/images/${file.originalname}`
    );

    const model = new Model({
      name: req.body.name,
      brand: req.body.brand,
      specification: {
        processor: req.body.processor,
        ram: req.body.ram,
        storage: req.body.storage,
        color: req.body.color,
        price: req.body.price,
        discount_price: req.body.discount_price,
        discount_percentage: req.body.discount_percentage,
      },
      images: imagePath,
    });
    console.log(model);
    await model.save();
    return res.json({
      status: 201,
      message: "Model created successfully",
      code: model,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.json(categories);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getBrand = async (req, res) => {
  try {
    const brands = await Brand.find({ category: req.params.categoryId });
    res.json(brands);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getModel = async (req, res) => {
  try {
    const models = await Model.find({ brand: req.params.brandId });
    res.json(models);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  createCategory,
  createBrand,
  createModel,
  getCategory,
  getBrand,
  getModel,
  upload,
};
