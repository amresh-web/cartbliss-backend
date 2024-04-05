const Product = require("../models/product.model");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    console.log('hello',file)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

const upload = multer({storage});

const addProduct = async (req, res) => {
  const {productName,modalno,price,color,description,image} = req.body;
  const images = req.files.map(file => file.path);
  console.log(images)
  const product = new Product({
    productName,modalno,price,color,description,images
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

const getProductList = async (req, res) => {
      try {
      const products = await Product.find();
      res.status(200).json({message: "Product retrive succefully", data: products})
   
    } catch(err){
      res.status(500).json({ message: 'Failed to fetch products' });
    }
}


module.exports = { addProduct, upload, getProductList };
