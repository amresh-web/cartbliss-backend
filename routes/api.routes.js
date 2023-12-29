const express = require('express');
const router = express.Router();

router.use('/category', require('./category.routes'));

module.exports = router;