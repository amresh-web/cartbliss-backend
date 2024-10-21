const express = require("express");
const {
  createCategory,
  createBrand,
  createModel,
  getCategory,
  getBrand,
  getModel,
  upload,
  getModelByCategory,
} = require("../controllers/category.controller");
const { verifyToken } = require("../middleware/verifyToken");

const categoryRouter = express.Router();

categoryRouter.post("/addcategory", verifyToken, createCategory);
categoryRouter.post("/addbrand", verifyToken, createBrand);
categoryRouter.post(
  "/addmodel",
  verifyToken,
  upload.array("images"),
  createModel
);
categoryRouter.get("/getcategory", getCategory);
categoryRouter.get("/getcategory/:categoryId/getbrand", getBrand);
categoryRouter.get("/getbrand/:brandId/getmodel", getModel);
categoryRouter.get("/getcategory/:categoryId/getallmodel", getModelByCategory);

module.exports = categoryRouter;
