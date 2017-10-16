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
    },
    tokens: [{
        access: {
            type: String,
            required : true
        },
        token: {
            type: String,
            required : true
        }
    }]
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

UserSchema.methods = {
    generateAuthToken: function () {
        const user = this,
        access = 'auth',
        token = jwt.sign({_id: user._id.toHexString(), access}, 'abd123'.toString());
        user.tokens.push({access,token});
        return user.save().then(() => {
            return token;
        });
    }
}

UserSchema.statics = {
    findByCredentials : function(username, password) {
        const User = this;

        return User.findOne({username}).then((user)=>{
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