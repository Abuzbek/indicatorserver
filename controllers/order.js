const asyncHandler = require('../middleware/async');
const Order = require('../models/Order');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Add Order
// @route     POST /api/order
// @access    Private / User
exports.createOreder = asyncHandler(async (req,res,next) => {
    if(!req.body){
        return next(
            new ErrorResponse(`Required params`, 400)
        );
    }
    const order = new Order ({
        order: Date.now(),
        user: req.user.id,
        address: req.body.address,
        product: req.body.product
    })
    res.status(201).json({
        success: true,
        data: order
    })
});


// @desc      Get All Order
// @route     GET /api/order
// @access    Private / Admin
exports.getAllOreder = asyncHandler(async (req,res,next) => {
    res.status(200).json(res.advancedResults);

});


// @desc      Get Order By User
// @route     GET /api/order/my
// @access    Private / User
exports.getOrederByUser = asyncHandler(async (req,res,next) => {
    let order = await Order.find(req.user.id);
    if (!order) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({ success: true, data: order });

});

// @desc      Update Order
// @route     PUT /api/order/:id
// @access    Private / Admin
exports.updateOrder = asyncHandler(async (req, res, next) => {
    let order = await Order.findById(req.params.id);

    if (!order) {
        return next(
            new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
        );
    }

    // Make sure user is order owner
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.params.id} is not authorized to update this order`,
                401
            )
        );
    }

    order = await Order.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, data: order });
});

// @desc      Delete order
// @route     DELETE /api/order/:id
// @access    Private / Admin
exports.deleteOrder = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(
            new ErrorResponse(`Order not found with id of ${req.params.id}`, 404)
        );
    }

    // Make sure user is Order owner
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User ${req.params.id} is not authorized to delete this order`,
                401
            )
        );
    }

    order.remove();

    res.status(200).json({ success: true, data: {} });
});

// @desc      Delete this user
// @route     DELETE /api/order/
// @access    Private / This User
exports.deleteOrderByThisUser = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.headers.order);

    if (!order) {
        return next(
            new ErrorResponse(`Order not found`, 404)
        );
    }

    // Make sure user is Order owner
    if (order.user.toString() !== req.user.id) {
        return next(
            new ErrorResponse(
                `User is not authorized to delete this order`,
                401
            )
        );
    }

    order.remove();

    res.status(200).json({ success: true, data: {} });
});
