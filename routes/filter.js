const express = require('express');
const { filterByPrice } = require('../controllers/filter');


const router = express.Router({ mergeParams: true });

router.get('/', filterByPrice)

module.exports = router;