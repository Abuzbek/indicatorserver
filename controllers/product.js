const asyncHandler = require('../middleware/async');
const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');
// @desc      Get all product
// @route     GET /api/v1/product
// @access    Private/Admin
exports.getProduct = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});



// @desc      Create product
// @route     POST /api/v1/product
// @access    Private/Admin
exports.createProduct = asyncHandler(async (req, res, next) => {
    if(!req.body){
        return next(
            new ErrorResponse(`Required params`, 400)
        );
    }
    const urls = [];
    const files = req.files;

    for (const file of files) {
        const { path } = file;
        urls.push(path);
    }
    const product = new Product({
        images: urls,
        titleuz: req.body.titleuz,
        titleru: req.body.titleru,
        category: req.body.category,
        detailsuz: req.body.detailsuz,
        detailsru: req.body.detailsru,
        inforu: req.body.inforu,
        infouz: req.body.infouz,
        price: req.body.price,
        type: req.body.type,
    });

   product.save().then(
       ()=> res.status(201).json({
           success: true,
           data: product
       })
   )

});

// @desc      Update product
// @route     PUT /api/product/:id
// @access    Private/Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: product
    });
});

// @desc      Delete product
// @route     DELETE /api/product/:id
// @access    Private/Admin
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        data: {}
    });
});

// @desc      Get Product By Id
// @route     GET /api/product/all/:id
// @access    PUBLIC
exports.getProductById = asyncHandler(async (req, res, next) => {
   const product =  await Product.find({_id: req.params.id});

    res.status(200).json({
        success: true,
        data: product
    });
});


// @desc      Get all product
// @route     GET /api/v1/product
// @access    Private/Admin
exports.getProductByUser = asyncHandler(async  (req,res,next) => {
    const query = { state: 'OK' };
    const n = Product.count(query);
    const r = Math.floor(Math.random() * n);
    const topThree = await Product.find().skip(r).limit(3);
    const popular = await Product.find().sort({rating: -1}).limit(8);
    const newProduct = await Product.find().sort({createdAt: -1}).limit(8);
    const budget = await Product.find().sort({price: 1}).limit(8);
    const best = await Product.find().sort({price: -1}).limit(8)
    res.status(200).json({
        success: true,
        data: {
            topThree,
            popular,
            newProduct,
            budget,
            best
        }
    })
})
