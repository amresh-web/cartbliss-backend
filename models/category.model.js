const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    }
});

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    caegory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
});

const Category =mongoose.model('Category', categorySchema);
const SubCategory =mongoose.model('Subcategory', subCategorySchema);

module.exports = {Category, SubCategory}