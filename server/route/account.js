const router = require('express').Router();
const User = require('../DB_models/user_model');

router.get('/', (req, res) => {
    User.findOne({ _id: req.userId }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                'userData': {
                    'name': user.userName,
                    'lastName': user.userLastName,
                    'picture': user.picture,
                    'email': user.userEmail
                }
            });
        }
    });
});

router.post('/', (req, res) => {
    User.findOne({ _id: req.userId }, (err, user) => {
        if (err) {
            res.status(400).send('could not find user');
        } else {
            if (req.body.name) user.userName = req.body.name;
            if (req.body.lastName) user.userLastName = req.body.lastName
            if (req.body.email) user.userEmail = req.body.email;

            user.save((error, updatedUser) => {
                if ( error ) {
                    console.log(error);
                    return res.status(400).json({
                        message: "Failed to change acount settings."
                    });
                } else {
                    res.status(200).json('success save new settings');
                }
            });
        }
    });
});

router.post('/change', (req, res) => {
    User.findOne({ _id: req.userId }, (err, user) => {
        if (err) {
            res.status(400).send('could not find user');
        } else {
            if (req.body.password) user.userPassword = req.body.password;
            user.setPassword(req.body.password);

            user.save((error, updatedUser) => {
                if ( error ) {
                    console.log(error);
                    return res.status(400).json({
                        message: "Failed to change account password."
                    });
                } else {
                    res.status(200).json('success save new password');
                }
            });
        }
    });
});

router.get('/address', (req, res) => {
    User.findOne({ _id: req.userId, address: { $exists: true }}, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (user) {
                res.json({
                    'address': {
                        'country': user.address.country,
                        'province': user.address.province,
                        'city': user.address.city,
                        'shipAddress': user.address.shipAddress,
                        'postCode': user.address.postCode
                    }
                });
            } else {
                res.status(204).send('address is empty');
            }
        }
    });
})

router.post('/address', (req, res) => {
    User.findOne({ _id: req.userId }, (err, user) => {
        if (err)
        {
            console.log(req);
            res.status(400).send('could not find user');
        }
        else {
            const newAddress = req.body;
            if (newAddress.country) user.address.country = newAddress.country;
            if (newAddress.province) user.address.province = newAddress.province;
            if (newAddress.city) user.address.city = newAddress.city;
            if (newAddress.shipAddress) user.address.shipAddress = newAddress.shipAddress;
            if (newAddress.postCode) user.address.postCode = newAddress.postCode;

            user.save((error, updatedUser) => {
                if ( error ) {
                    console.log(error);
                    return res.status(400).json({
                        message: "Failed to save address to user."
                    });
                } else {
                    res.status(200).json('success save address data');
                }
            });
        }
    });
});

module.exports = router;
