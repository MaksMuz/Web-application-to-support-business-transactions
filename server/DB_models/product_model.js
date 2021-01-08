const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deepPopulate = require('mongoose-deep-populate')(mongoose);
const mongooseAlgolia = require('mongoose-algolia');

const ProductModelSchema = new Schema({

    productShortDescription: String,
    productSpecification: String,
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
    productLittleViews: {
        type: Schema.Types.ObjectId, ref: 'LittleView'
    }
}, { // what \/
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
});

ProductModelSchema
    .virtual('averageRating')
    .get(function() {
        var rating = 0;
        if (this.productLittleViews.length === 0) {
            rating = 0;
        } else {
            this.productLittleViews.map((littleView_model) => {
                rating += littleView_model.littleViewRating;
            });
            rating = rating / this.productLittleViews.length;
        }

        return rating;
    });

ProductModelSchema.plugin(deepPopulate);
ProductModelSchema.plugin(mongooseAlgolia, {
    appId: 'CO3GNO6BHL',
    apiKey: '3a4325e1bed03a2fa814393542dcbe61',
    indexName: 'new1',
    selector: '_id title image reviews description price owner created averageRating',
    populate: {
        path: 'littleViewOwner productLittleViews',
        select: 'name rating'
    },
    defaults: {
        author: 'uknown'
    },
    mappings: {
        title: function(value) {
            return `${value}`
        }
    },
    virtuals: {
        averageRating: function(doc) {
            var rating = 0;
            if (doc.productLittleViews.length === 0) {
                rating = 0;
            } else {
                doc.productLittleViews.map((littleView_model) => {
                    rating += littleView_model.littleViewRating;
                });
                rating = rating / doc.productLittleViews.length;
            }

            return rating;
        }
    },
    debug: true
})
// /\

let Model =  mongoose.model('Product', ProductModelSchema);
Model.SyncToAlgolia();
Model.SetAlgoliaSettings({
    searchableAttributes: ['productShortDescription']
});
module.exports = Model
