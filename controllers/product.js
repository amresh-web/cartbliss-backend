const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "I am get all product" });
};

const getAllProductsTesting = async (req, res) => {
  res.status(200).json({ msg: "I am get all product testing" });
};

module.exports = { getAllProducts, getAllProductsTesting };
