const express = require("express");
const router = express.Router();

const Category = require("../models/category.model");

//Post Method
router.post("/post", async (req, res) => {
  const data = new Category({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
  });
  console.log(data);
  try {
    const dataTOSave = await data.save();
    res.status(200).json(dataTOSave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// //Get all Method
// router.get('/getall', (req, res) => {
//     res.send('Get All API')
// })

module.exports = router;
