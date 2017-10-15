const mongoose = require('mongoose'),
_ = require('lodash');
const User = mongoose.model('User'); 

const userController ={
    newUser : (req, res) => {
        let body = _.pick(req.body, ['username', 'password']);
        
        const new_User = new User(body);
        new_User.save()
        .then(()=>{
            res.send({user : new_User});
        }).catch(err=>{
            console.log(err);
        });
    },
    signIn : (req, res) => {
        let body = _.pick(req.body, ['username', 'password']);
        
        User.findByCredentials(body.username, body.password).then(user => {
            res.send({user});
        })

    }   
}

module.exports = userController;