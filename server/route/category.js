const router = require('express').Router();
const Category = require('../DB_models/category_model');

router.get('/',(req, res) => {
    Category.find({}, (err, categories) => {
        if (err) {
            return res.status(400).json('Failed to find categories.');
        } else {
            res.json({categories: categories});
        }
    })
})
router.post('/',(req, res) => {
    let categoryData = req.body;
    let category = new Category();
    category.categoryName = categoryData.name;
    category.save((error, category) => {
        if ( error ) {
            return res.status(400).json('Failed to add category.');
        } else {
            res.status(200).json('success add category');
        }
    });
});

module.exports = router;
