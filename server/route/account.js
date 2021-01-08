const router = require('express').Router();
const User = require('../DB_models/user_model');

router.get('/', (req, res) => {
    let userData = req.body;
    User.findOne({ _id: userData.userId }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            res.json({
                'userData': {
                    'name': user.userName,
                    'lastName': user.userLastName,
                    'email': user.userEmail,
                    'picture': user.picture
                }
            });
        }
    });
    })

module.exports = router;
