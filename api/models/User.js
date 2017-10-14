const mongoose = require('mongoose');
const _ = require('lodash');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : {
        type : String,
        require : true,
        minlength  : 6,
        unique : true
    },
    password : {
        type : String,
        require : true,
        minlength : 6
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;