const asyncHandler = require('../middleware/async');
const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.getStats = asyncHandler(async (req,res,next) => {

    const productByRating = await Product.find().sort({rating: -1}).populate('category');
    const allProductCount = await Product.find()._countDocuments();
    const lastProducts = await Product.find().sort({createdAt: -1}).limit(5);

    const lastNewOrders = await Order.find({status: 'new'}).sort({createdAt: -1}).limit(5);
    const allOrderCount = await Order.find()._countDocuments();

    const lastNewUsers = await User.find().sort({createdAt: -1}).limit(5);
    const allUserCount = await User.find()._countDocuments();

    res.status(200).json({
        success: true,
        data: {
             allProductCount,
             productByRating,
             lastProducts,
             lastNewOrders,
             allOrderCount,
             lastNewUsers,
             allUserCount
        }
    })

})
