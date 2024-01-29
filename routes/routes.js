const express = require('express');
const router = express.Router();

//router.use('/category', require('./category.routes'));

//Post Method
router.post('/post', (req, res) => {
    res.send('Post API')
})

//Get all Method
router.get('/getall', (req, res) => {
    res.send('Get All API')
})

module.exports = router;