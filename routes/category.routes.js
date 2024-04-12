const express = require("express");
const {createCategory, createSubCategory, getSubcategoryByCategoryId} = require("../controllers/category.controller");

const categoryRouter = express.Router();

categoryRouter.post('/addcategory', createCategory);
categoryRouter.post('/addsubcategory', createSubCategory);
categoryRouter.get('/getsubcategory', getSubcategoryByCategoryId);

module.exports = categoryRouter;
