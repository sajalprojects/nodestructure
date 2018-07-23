'use strict';
let userCtl = require('./userCtl');
var express = require('express');
var user = express.Router();


user.get('/users', userCtl.getAll);
user.get('/users/:userId', userCtl.getById);
user.post('/users', userCtl.create);
user.put('/users/:userId', userCtl.update);
user.delete('/users/:userId', userCtl.delete);


module.exports = user;
