const router = require('express').Router();
const Product = require('../DB_models/product_model');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'C:/Users/maksi/Desktop/Praca inzynierska/client/inzynierka/src/assets/images/');
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname);
    }
});

var upload = multer({storage: storage})

//let upload = multer({ dest: 'uploads/' })
router.post('/', upload.single('productImage'), (req, res) => {
    let productData = req.body;
    let product = new Product();
    const path = req.file.filename;
    product.productTitle = productData.productTitle;
    product.productDescription = productData.productDescription;
    product.productPrice = productData.productPrice;
    product.productImage = 'assets/images/' + path;
    product.productOwner = req.userId;
    product.productCategory = productData.productCategory;
    product.save((error, product) => {
        if ( error ) {
            return res.status(400).json('Failed to add product.');
        } else {
            res.status(200).json('success add product');
        }
    });
});

module.exports = router;
