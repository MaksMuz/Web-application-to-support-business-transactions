const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deepPopulate = require('mongoose-deep-populate')(mongoose);

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

OrderDetailsModelSchema.plugin(deepPopulate);

module.exports = mongoose.model('OrderDetails', OrderDetailsModelSchema)
