const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../DB_models/user_model');

router.post('/register', (req, res) => {
    let userData = req.body;
    let user = new User();
    user.userName = userData.name;
    user.userLastName = userData.lastName;
    user.userEmail = userData.email;
    user.userPassword = userData.password;
    user.picture = user.avatar();
    // call setPassword function to hash
    user.setPassword(userData.password);
    user.save((error, registeredUser) => {
        if ( error ) {
            return res.status(400).send({
                message: "Failed to add user."
            });
        } else {
            let token = jwt.sign(registeredUser._id.toString(), config.SECRET);
            res.status(200).send({token});
        }
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;
    //find user with email
    User.findOne({userEmail: userData.email}, (error, user) => {
        if(error) {
            console.log(error);
        } else {
            if(!user) {
                res.status(401).send('Invalid email');
            } else
            if ( !user.validPassword(userData.password)) {
                res.status(401).send('Invalid password');
            } else {
                let token = jwt.sign(user._id.toString(), config.SECRET)
                res.status(200).send({
                    'token': token,
                    'userData': {
                        'name': user.userName,
                        'lastName': user.userLastName,
                        'email': user.userEmail
                    }
                });
            }

        }
    });
});

module.exports = router;
