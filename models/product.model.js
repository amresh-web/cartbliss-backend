const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Please enter product name"]
    },
    modalno: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true        
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);