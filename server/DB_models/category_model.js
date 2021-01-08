const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryModelSchema = new Schema({
    categoryName: {
        type: String,
        lowercase: true,
        unique:true
    }
});

module.exports = mongoose.model('Category', CategoryModelSchema);
