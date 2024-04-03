const Product = require("../models/product.model");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

var upload = multer({storage: storage});

const addProduct = async (req, res) => {
  const {productName,modalno,price,color,description,image} = req.body;

  const product = new Product({
    productName,modalno,price,color,description,image
  })

  try {
    await product.save();
    return res.json({
      status: 201,
      message: "One product added",
      data: product
    });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}



module.exports = { addProduct };
