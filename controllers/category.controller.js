const Category = require("../models/category.model");

class CategoryController {
 
  add = async (req, res) => {
         const data = new Category({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
          });
       
          try {
            const dataTOSave = await data.save();
            res.status(200).json(dataTOSave);
          } catch (err) {
            res.status(400).json({ message: err.message });
          }
  };
 
}

module.exports = CategoryController;
