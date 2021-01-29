const router = require('express').Router();
const Product = require('../DB_models/product_model');
const multer = require('multer');
const sharp = require('sharp');

/*const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'C:/Users/maksi/Desktop/Praca inzynierska/client/inzynierka/src/assets/images/');
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname);
    }
});*/
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.get('/', (req, res) => {
    Product.find( { productOwner: req.userId }).populate('productCategory').exec((err, products)=> {
        if (err) {
            console.log(err);
            return res.status(400).json('Failed to find user products.');
        } else {
            res.json({products: products});
        }
    });
});

router.delete('/:id', (req,res) => {
    if (!req.params.id) {
        return res.status(400).json('No id.');
    }
    Product.deleteOne( { _id: req.params.id }, (err, product)=> {
        if (err) {
            return res.status(400).json('Failed to delete product.');
        } else {
            res.status(200).json('Remove product success');
        }
    });
});

router.post('/', upload.single('productImage'), async (req, res) => {
    let productData = req.body;
    let product = new Product();
    const path = req.file.originalname;
    await sharp(req.file.buffer).resize({ width: 1024, height: 570,  fit: "contain"}).toFile('C:/Users/maksi/Desktop/Praca inzynierska/client/inzynierka/src/assets/images/' + path);
    product.productTitle = productData.productTitle;
    product.productDescription = productData.productDescription;
    product.productPrice = productData.productPrice;
    product.productImage = 'assets/images/' + path;
    product.productOwner = req.userId;
    product.productCategory = productData.productCategory;
    product.save((error, product) => {
        if ( error ) {
            return res.status(400).json('Failed to add product.');
        } else {
            res.status(200).json('success add product');
        }
    });
});

module.exports = router;
