const Category = require("../models/category.model").default;

class CategoryController {
  add = async (req, res) => {
    const data = new Category({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
    });

    try {
      const dataTOSave = await data.save();
      res.json({
        status: 200,
        message: "Data saved successfully",
        data: dataTOSave,
      });
    } catch (err) {
      res.json({ message: err.message });
    }
  };

  getAll = async (req, res) => {
    try {
      const categoryData = await Category.find();
      res.json({
        status: 200,
        message: "All data get successfully",
        data: categoryData,
      });
    } catch (err) {
      res.json({ message: err.message });
    }
  };

  getOne = async (req, res) => {
    try {
      const subCategoryData = await Category.findById(req.params.id);
      res.json({
        status: 200,
        message: "Data retrieved successfully",
        data: subCategoryData,
      });
    } catch (err) {
      res.json({ message: err.message });
    }
  };
}

module.exports = CategoryController;
