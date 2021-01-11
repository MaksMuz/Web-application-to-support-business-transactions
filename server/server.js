const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


//to save img
//const fs = require('fs');
//const path = require('path');

const app = express();
//mongoDB connection
mongoose.connect(config.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true },err => {
    if(err) {
        console.log('Error!' + err);
    } else {
        console.log('Connected');
    }
});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors());

//routes
const authRoutes = require('./route/authorization');
const accountRoutes = require('./route/account');
const categoryRoutes = require('./route/category');
const productRoutes = require('./route/product');
const addProductRoutes = require('./route/addProduct');

app.use('/api/category', categoryRoutes);
app.use('/api/authorization', authRoutes);
app.use('/api/product', productRoutes);
app.use(expressJwt( {secret: config.SECRET, algorithms: ['HS256'], requestProperty: 'userId' })); //pozwalam na przejscie logowania i rejestracji bez tokena

app.use('/api/addProduct', addProductRoutes)
app.use('/api/account', accountRoutes);
//creating server on port 3000
app.listen(config.PORT, err => {
    console.log('Server work on port: ' + config.PORT);
});
/*
//upload img to mongo
var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

app.get('/', (req, res) => {
    User.find({}, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('app', { items: items });
        }
    });
});

// Uploading the image
app.post('/', upload.single('image'), (req, res, next) => {

    var obj = {
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    User.img(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });
});

*/
