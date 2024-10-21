const mongoose = require("mongoose");
const { Category, Brand, Model } = require("../models/category.model");
const multer = require("multer");
const path = require("path");
const { console } = require("inspector");

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
    callback(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

const createModel = async (req, res) => {
  console.log("am", req.body);
  try {
    const images = req.files.map((file) => file.filename);
    const specifications = JSON.parse(req.body.specifications || "{}");
    console.log(specifications);
    const model = new Model({
      name: req.body.name,
      brand: req.body.brand,
      specifications,
      images,
    });

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
  console.log("getmodel call");
  try {
    const models = await Model.find({ brand: req.params.brandId });
    res.json(models);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getModelByCategory = async (req, res) => {
  console.log(req.params.categoryId);
  try {
    const model = await Model.find().populate({ path: "brand" });
    const filterCategory = model.filter(
      (brand) => brand.brand.category == req.params.categoryId
    );
    //const filterBrand = model.filter((brand)=> brand.brand == '66a3431b6807cf7d3aad113c');
    res.json(filterCategory);
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
  getModelByCategory,
};
