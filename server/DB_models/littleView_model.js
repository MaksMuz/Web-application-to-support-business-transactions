const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const littleViewModelSchema = new Schema({
    littleViewTitle: String,
    littleViewSpecification: String,
    littleViewOwner: {
        type: Schema.Types.ObjectId, ref: 'Users'
    },
    littleViewRating: {
        type: Number, default: 0
    },
    littleViewCreated: {
        type: Date, default: Date.now
    }
});

module.exports = mongoose.model('LittleView', littleViewModelSchema);
