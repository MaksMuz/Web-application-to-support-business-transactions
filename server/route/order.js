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
                message: 'Successful payment'
            });
        });
});

router.get('/', (req, res) => {
    Order.find({ orderOwnerId: req.userId })
        //.populate('orderProducts.orderProduct')
        //.populate('orderOwnerId')
        .exec((err, orders) => {
            if (err) {
                res.status(400).send('Failed to find your orders');
            } else {
                res.json({orders: orders});
            }
        });
});

router.get('/:id',(req, res) => {
    Order.findOne({ _id: req.params.id })
        .deepPopulate('orderProducts.orderProduct.productOwner')
        .populate('orderOwnerId')
        .exec((err, order) => {
            if (err) {
                res.status(400).send('Failed to find your orders');
            } else {
                res.json({order: order});
            }
        });
});

module.exports = router;
