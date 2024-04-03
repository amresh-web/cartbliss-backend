const express = require("express");
const { addProduct } = require("../controllers/product.controller");

const productRouter = express.Router();

productRouter.post('/addproduct', addProduct)

module.exports = productRouter;
