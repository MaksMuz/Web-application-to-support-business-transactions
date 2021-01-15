const router = require('express').Router();
const Product = require('../DB_models/product_model');
const querystring = require('querystring');

router.get('/',(req, res) => {
    Product.find({}, (err, products) => {
        if (err) {
            return res.status(400).json('Failed to find products.');
        } else {
            res.json({products: products});
        }
    })
})

router.get('/category/:id',(req, res) => {
    Product.find({productCategory: req.params.id}).exec((err, products) => {
        if (err) {
            console.log(err);
            return res.status(400).json('Failed to find products in category.');
        } else {
            res.json({products: products});
        }
    });
});

router.get('/price?',(req, res) => {
    const values = querystring.parse(req.query.parameters);
    Product.find({productPrice: {$gte: values.valueFrom, $lte: values.valueTo}})
        .exec((err, products) => {
        if (err) {
            console.log(err);
            return res.status(400).json('Failed to find by price.');
        } else {
            res.json({products: products});
        }
    });
});

router.get('/search?',(req, res) => {
    const reg = querystring.parse(req.query.parameters);
    Product.find({ productTitle: { $regex: reg.reg, $options: "i" }})
        .exec((err, products) => {
            if (err) {
                console.log(err);
                return res.status(400).json('Failed to find by search.');
            } else {
                res.json({products: products});
            }
        });
});


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
