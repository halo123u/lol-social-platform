const mongoose = require('mongoose'), 
_ = require('lodash'),
jwt = require('jsonwebtoken'),
bcrypt = require('bcryptjs');

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

UserSchema.pre('save',function(next){
    const user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                console.log(hash);_
                next();
            })
        })
    } else {
        next();
    }
});

UserSchema.statics = {
    findByCredentials : function(email, password) {
        const User = this;

        return User.findOne({email}).then((user)=>{
            if(!user){
                return Promise.reject();
            }

            return new Promise((resolve,reject) => {
                bcrypt.compare(password,user.password, (err, res) => {
                    if(res){
                        resolve(user);
                    } else {
                        reject();
                    }
                });
            });
        });
    }
} 

const User = mongoose.model('User', UserSchema);
module.exports = User;