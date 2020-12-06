const mongoose = require('mongoose');
const slugify = require('slugify');

const CategorySchema = new mongoose.Schema({
    titleuz:{
        type: String,
        maxlength: 150,
        required: [true, 'Please add a uzb title for the category']
    },
    titleru:{
        type: String,
        maxlength: 150,
        required: [true, 'Please add a rus title for the category']
    },
    slug: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

CategorySchema.pre('save', function(next) {
    this.slug = slugify(this.titleru, { lower: true });
    next();
});
// Cascade delete category when a product is deleted
CategorySchema.pre('remove', async function(next) {
    console.log(`Product being removed from category ${this._id}`);
    await this.model('Product').deleteMany({ category: this._id });
    next();
});
  
module.exports = mongoose.model('Category', CategorySchema);