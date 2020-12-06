const express = require('express');
const {
    getStats
} = require('../controllers/statistic');


const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.use(protect)

router.get('/',authorize('admin','publisher'),getStats);

module.exports = router;
