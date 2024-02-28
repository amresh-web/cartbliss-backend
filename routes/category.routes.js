const express = require("express");
const CategoryController = require("../controllers/category.controller");

const categoryRouter = express.Router();
const categoryController = new CategoryController();

categoryRouter.get("/getall", categoryController.getAll);
categoryRouter.post("/add", categoryController.add);
categoryRouter.get("/one/:id", categoryController.getOne);

module.exports = categoryRouter;
