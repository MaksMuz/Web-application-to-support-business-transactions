const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema;

const OrderDetailsModelSchema = new Schema({
    orderOwnerId: {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    orderProducts: [{
        orderProduct: {
            type: Schema.Types.ObjectId, ref: 'product'
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

OrderDetailsModelSchema.plugin(deepPopulate);

module.exports = mongoose.model('orderDetails', OrderDetailsModelSchema, 'Orders')
