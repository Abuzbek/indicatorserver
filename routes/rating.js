const router = require('express').Router()

const { createRatingProduct, productByRating } = require('../controllers/rating')

router.post('/', createRatingProduct);
router.get('/', productByRating);

module.exports = router;
