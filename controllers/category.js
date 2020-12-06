const Category = require('../models/Category')
const asyncHandler = require('../middleware/async');
// @desc      Get all categories
// @route     GET /api/v1/category
// @access    Private/Admin
exports.getCategory = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc      Create category
// @route     POST /api/v1/category
// @access    Private/Admin
exports.createCategory = asyncHandler(async (req, res, next) => {
    const user = await Category.create(req.body);

    res.status(201).json({
        success: true,
        data: user
    });
});

// @desc      Update category
// @route     PUT /api/category/:id
// @access    Private/Admin
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const user = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc      Delete category
// @route     DELETE /api/category/:id
// @access    Private/Admin
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        data: {}
    });
});