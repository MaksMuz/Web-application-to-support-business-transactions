const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductModelSchema = new Schema({

    productTitle: String,
    productDescription: String,
    productPrice: Number,
    productImage: {
        data: Buffer,
        contentType: String
    },
    productCreatedDate: {
        type: Date, default: Date.now
    },
    productCategory: {
        type: Schema.Types.ObjectId, ref: 'Categories'
    },
    productOwner: {
        type: Schema.Types.ObjectId, ref: 'Users'
    },
});

let Model =  mongoose.model('product', ProductModelSchema, 'Products');
module.exports = Model
