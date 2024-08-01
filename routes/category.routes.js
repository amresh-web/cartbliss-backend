const express = require("express");
const {
  createCategory,
  createBrand,
  createModel,
  getCategory,
  getBrand,
  getModel,
  upload,
} = require("../controllers/category.controller");

const categoryRouter = express.Router();

categoryRouter.post("/addcategory", createCategory);
categoryRouter.post("/addbrand", createBrand);
categoryRouter.post("/addmodel", upload.array("images", 10), createModel);
categoryRouter.get("/getcategory", getCategory);
categoryRouter.get("/getcategory/:categoryId/getbrand", getBrand);
categoryRouter.get("/getbrand/:brandId/getmodel", getModel);

module.exports = categoryRouter;
