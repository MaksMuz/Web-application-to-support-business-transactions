const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductModelSchema = new Schema({

    productTitle: String,
    productDescription: String,
    productPrice: Number,
    productImage: String,
    productCreatedDate: {
        type: Date, default: Date.now
    },
    productCategory: {
        type: Schema.Types.ObjectId, ref: 'Category'
    },
    productOwner: {
        type: Schema.Types.ObjectId, ref: 'Users'
    },
});

let Model =  mongoose.model('Product', ProductModelSchema, 'Products');
module.exports = Model
