const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const UserModelSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    userLastName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        unique: true,
        lowercase: true,
        required : true
    },
    userPassword: {
        type: String,
        required: true
    },
    salt: String,
    picture: String,
//    img:
//        {
//            data: Buffer,
//            contentType: String
//        },
//    address: {
//        country: String,
//        province: String,
//        city: String,
//        addres: String,
//        postCode: String
//    },
    created: {
        type: Date,
        default: Date.now
    },
});

// hashowanie hasel

//method to set salt and hash the password for a user
UserModelSchema.methods.setPassword = function(password) {
    //unique salt for a particular user
    this.salt = crypto.randomBytes(16).toString('hex');
    //hashing user's salt and password with 1000 iterations
    this.userPassword = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
}

//check the entered password is correct or not
UserModelSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password,
        this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.userPassword === hash;
};

// gravatar photo mean avatar connected with email
UserModelSchema.methods.avatar = function(size) {
    if (!this.size) size = 200;
    if (!this.email) {
        return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
    } else {
        let md5 = crypto.createHash('md5').update(this.userEmail).digest('hex');
        return 'https://gravatar.com/avatar/' + md5 + '?s' + size + '&d=retro';
    }

}


module.exports = mongoose.model('user', UserModelSchema, 'Users');
