const stripe = require('stripe')('sk_test_51IAjVQACMfrvTe8g8UOegkNta0ZfGDEzXRlswmoXxzLBL3kxjaIqCPYJiLsVAUIf8xxKmMoZmh1Eb3O2AzYLxNfT008IbbWiO1');
const router = require('express').Router();
const Order = require('../DB_models/orderDetails_model');

router.post('/payment', (req, res) => {
    const stripeToken = req.body.stripeToken;
    const Charge = Math.round(req.body.totalPrice * 100);

    stripe.customers
        .create({
            source: stripeToken.id
        })
        .then(function(customer) {
            return stripe.charges.create({
                amount: Charge,
                currency: 'pln',
                customer: customer.id
            });
        })
        .then(function(charge) {
            const products = req.body.products;

            let order = new Order();
            order.orderOwnerId = req.userId;
            order.orderPrice = Charge;

            products.map(product => {
                order.orderProducts.push({
                    orderProduct: product.product,
                    orderQuantity: product.quantity
                });
            });

            order.save();
            res.status(200).send({
                'message': true
            });
        });
});

/*router.get('/orders', (req, res) => {
    Order.find({ owner: req.userId })
        .populate('products.product')
        .populate('owner')
        .exec((err, orders) => {
            if (err) {
                res.json({
                    success: false,
                    message: "Couldn't find your order"
                });
            } else {
                res.json({
                    success: true,
                    message: 'Found your order',
                    orders: orders
                });
            }
        });
});

router.get('/orders/:id',(req, res) => {
    Order.findOne({ _id: req.params.id })
        .deepPopulate('products.product.owner')
        .populate('owner')
        .exec((err, order) => {
            if (err) {
                res.json({
                    success: false,
                    message: "Couldn't find your order"
                });
            } else {
                res.json({
                    success: true,
                    message: 'Found your order',
                    order: order
                });
            }
        });
});*/

module.exports = router;
