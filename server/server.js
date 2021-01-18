const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');

const expressJwt = require('express-jwt');


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
const orderRoutes = require('./route/order');

app.use('/api/category', categoryRoutes);
app.use('/api/authorization', authRoutes);
app.use('/api/product', productRoutes);
app.use(expressJwt( {secret: config.SECRET, algorithms: ['HS256'], requestProperty: 'userId' })); //pozwalam na przejscie logowania i rejestracji bez tokena

app.use('/api/addProduct', addProductRoutes)
app.use('/api/account', accountRoutes);
app.use('/api/order', orderRoutes);
//creating server on port 3000
app.listen(config.PORT, err => {
    console.log('Server work on port: ' + config.PORT);
});
