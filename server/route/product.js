const router = require('express').Router();
const Product = require('../DB_models/product_model');

router.get('/',(req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            return res.status(400).json('Failed to find products.');
        } else {
            res.json({products: products});
        }
    })
})

router.post('/',(req, res) => {
    let productData = req.body;
    let product = new Product();
    product.productTitle = productData.productTitle;
    product.productDescription = productData.productDescription;
    product.productPrice = productData.productPrice;
    //productImage;
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
