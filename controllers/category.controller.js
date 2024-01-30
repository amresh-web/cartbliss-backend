const Category = require("../models/Category");

class CategoryController {
  getAll = (req, res) => {
    // Category.find()
    //   .then((docs) => {
    //     return res.status(200).send(docs);
    //   })
    //   .catch((err) => {
    //     return res.status(500).send({ message: "Internal server error" });
    //   });
    res.send("Get all categories data");
  };

  add = (req, res) => {
    const body = req.body;
    Category.create(body)
      .then((doc) => {
        //return res.status(200).send(doc)
        return res.status(200).json({ msg: "I am get all product" });
      })
      .catch((err) => {
        return res.status(500).send({ message: "Internal server error" });
      });
  };
}

module.exports = CategoryController;
