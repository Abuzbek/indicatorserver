const express = require('express')

const {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category')

const Category = require('../models/Category');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

//for admin panel
router.get('/',authorize('admin','publisher'),advancedResults(Category),getCategory);
router.put('/:id',authorize('admin','publisher'),updateCategory);
router.delete('/:id',authorize('admin'),deleteCategory);
router.post('/',authorize('admin','publisher'),createCategory);


module.exports = router;
