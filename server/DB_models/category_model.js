const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryModelSchema = new Schema({
    categoryName: {
        type: String,
        lowercase: true,
        unique:true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('category', CategoryModelSchema, 'Categories');
