const userRoutes = require('express').Router(),
userController = require('../controllers/userController');

userRoutes.post('/', userController.newUser);
userRoutes.post('/login', userController.signIn);


module.exports = userRoutes; 