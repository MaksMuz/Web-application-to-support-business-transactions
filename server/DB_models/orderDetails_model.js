const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderDetailsModelSchema = new Schema({
    orderHolder: {
        type: Schema.Types.ObjectId, ref: 'Users'
    },
    orderProducts: [{
        orderProduct: {
            type: Schema.Types.ObjectId, ref: 'Products'
    },
        orderQuantity: {
            type: Number,
            default: 1
        },
    }],
    orderPrice: {
        type: Number
    }
});



module.exports = mongoose.model('orderDetails', OrderDetailsModelSchema, 'Orders')
