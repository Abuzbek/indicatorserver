const mongoose = require('mongoose');
const slugify = require('slugify');

const OrderSchema = new mongoose.Schema({
    order:{type: Number, required: true},
    product:[{
        product:  {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true
        },
        num: {type: Number, required: true}
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
      type: String,
      required: true
    },
    status: {
        type: String,
        enum: ['new','active','success'],
        default: 'new'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Order', OrderSchema)
