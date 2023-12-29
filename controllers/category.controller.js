const category = require('../models/category.model');

class CategoryController {
    getAll = (req, res) => {
        category.find().then(docs => {
            return res.status(200).send(docs)
        }).catch(err => {
            return res.status(500).send({message: 'Internal server error'});
        })
    }

    add = (req, res) => {
        const body = req.body;
        category.create(body).then(doc => {
            return res.status(200).send(doc)
        }).catch(err => {
            return res.status(500).send({message: 'Internal server error'});
        })
    }
}

module.exports = CategoryController;