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
                    'picture': user.picture
                }
            });
        }
    });
    })

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
            res.status(400).send('could not save address');
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
                        message: "Failed to add address to user."
                    });
                } else {
                    res.status(200).json('success change address data');
                }
            });
        }
    });
});

module.exports = router;
