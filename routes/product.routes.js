const express = require("express");
const { addProduct, upload, getProductList } = require("../controllers/product.controller");

const productRouter = express.Router();

productRouter.post('/addproduct', upload.array('images', 5), addProduct)
productRouter.get('/getproductlist', getProductList )

module.exports = productRouter;
