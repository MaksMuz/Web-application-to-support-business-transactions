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

module.exports = router;
