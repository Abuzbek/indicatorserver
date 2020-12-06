const express = require('express')
const multer = require('multer')
const {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductByUser
} = require('../controllers/product')

const Product = require('../models/Product');

const router = express.Router({ mergeParams: true });

const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null, './uploads/products');
    },
    filename: function (req,file,cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});


const upload = multer({storage: storage});

const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');


router.get('/',protect,authorize('admin','publisher'),advancedResults(Product), getProduct)
router.post('/',protect,authorize('admin','publisher'),upload.array('images',12),createProduct);

router.get('/all',advancedResults(Product), getProduct)
router.get('/sorted',getProductByUser)
router.get('/all/:id', getProductById)

router
    .route('/:id')
    .put(protect,authorize('admin','publisher'),updateProduct)
    .delete(protect,authorize('admin','publisher'),deleteProduct);

module.exports = router;
