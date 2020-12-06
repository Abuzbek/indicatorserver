const mongoose = require('mongoose');
const slugify = require('slugify');

const ProductSchema = new mongoose.Schema({
    titleuz:{
        type: String,
        maxlength: 150,
        required: [true, 'Please add a uzb title for the product']
    },
    titleru:{
        type: String,
        maxlength: 150,
        required: [true, 'Please add a rus title for the product']
    },
    category:{
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        requird: true
    },
    detailsuz: {
        type: String,
        required: [true, 'Please add a details'],
        maxlength: [500, 'Description can not be more than 500 characters']
      },
    detailsru: {
        type: String,
        required: [true, 'Please add a details'],
        maxlength: [500, 'Description can not be more than 500 characters']
      },
    inforu: {
        type: String,
        required: [true, 'Please add a description']
    },
    infouz: {
        type: String,
        required: [true, 'Please add a description']
    },
    images:[
         {
            type: String,
            required: true
        }],
    price:{
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['old','new'],
        required: true
    },
    rating: {
      type: String,
      default: "0"
    },
    slug: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ProductSchema.pre('save', function(next){
    this.slug = slugify(this.titleru, { lower: true });
    next();
});

module.exports = mongoose.model('Product',ProductSchema)