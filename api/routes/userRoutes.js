const userRoutes = require('express').Router(),
userController = require('../controllers/userController');

userRoutes.post('/', userController.newUser);

module.exports = userRoutes; 