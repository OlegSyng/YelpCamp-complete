const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const usersControllers = require('../controllers/users');

router.route('/register')
    .get(usersControllers.renderRegister)
    .post(catchAsync(usersControllers.register));

router.route('/login')
    .get(usersControllers.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), usersControllers.login)

router.get('/logout', usersControllers.logout);

module.exports = router;