const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"]
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);