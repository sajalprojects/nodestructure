'use strict';
let userCtl = require('./userCtl');
var express = require('express');
var user = express.Router();

// user.post('/signup', userCtl.signup);
user.post('/login', userCtl.login);
user.post('/signup', userCtl.signup);

module.exports = user;
