const express = require('express'),
userRoutes = express.Router();

userRoutes.post('/', (req,res) =>{
    console.log(req.body.username);
    console.log(req.body.password);
});

module.exports = userRoutes; 