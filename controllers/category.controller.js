const category = require('../models/category.model');

class CategoryController {
    getAll = (req, res) => {
        // category.find().then(docs => {
        //     return res.status(200).send(docs)
        // }).catch(err => {
        //     return res.status(500).send({message: 'Internal server error'});
        // })
        res.send('This is get request')
    }

    add = (req, res) => {
        const body = req.body;
        category.create(body).then(doc => {
            //return res.status(200).send(doc)
            return res.status(200).json({ msg: "I am get all product" });
        }).catch(err => {
            return res.status(500).send({message: 'Internal server error'});
        })
    }
}

module.exports = CategoryController;