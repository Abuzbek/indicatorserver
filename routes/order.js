const express = require('express')

const {
    getAllOreder,
    getOrederByUser,
    createOreder,
    deleteOrder,
    deleteOrderByThisUser,
    updateOrder
} = require('../controllers/order')

const Order = require('../models/Order');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

//for admin panel
router.get('/',authorize('admin','publisher'),advancedResults(Order),getAllOreder);
router.put('/:id',authorize('admin','publisher'),updateOrder);
router.delete('/:id',authorize('admin'),deleteOrder);

//for user panel
router.post('/',authorize('user','admin','publisher'),createOreder);
router.get('/my',authorize('user','admin','publisher'),getOrederByUser)
router.delete('/my',authorize('user','admin','publisher'),deleteOrderByThisUser)

module.exports = router;
