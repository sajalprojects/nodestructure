'use strict';
let bookCtl = require('./bookCtl');
var express = require('express');
var book = express.Router();


book.get('/books',bookCtl.cacheGetAll, bookCtl.getAll);
book.get('/books/:bookId', bookCtl.getById);
book.post('/books/', bookCtl.create);
book.put('/books/:bookId', bookCtl.update);
book.delete('/books/:bookId', bookCtl.delete);

module.exports = book;
