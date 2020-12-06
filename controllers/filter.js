//const Product = require('../models/Product')
const asyncHandler = require('../middleware/async');

// @desc      Filter By Price
// @route     GET /api/filter
// @access    Public
exports.filterByPrice = asyncHandler(async (req,res,next) => {
    res.send(req.query)
})