const express = require("express");
const router = express.Router();

router.use("/category", require("./category.routes"));
router.use("/user", require("./user.routes"));

module.exports = router;
