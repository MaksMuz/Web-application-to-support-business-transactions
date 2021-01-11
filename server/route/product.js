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

router.get('/:id',(req, res) => {
    if (!req.params.id) {
        return res.status(400).json('No id.');
    }
    Product.findById(req.params.id)
        .populate('productCategory')
        .populate('productOwner')
        .exec((err, product) => {
            if (err) {
                console.log(err);
                return res.status(400).json('Failed to find product.');
            } else {
                res.json({product: product});
            }
        });
});

module.exports = router;
