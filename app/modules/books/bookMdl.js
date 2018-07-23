'use strict';
// const Sequelize = require('sequelize');
const {Sequelize, sequelize} 					= require('../../../lib/dbcon');
const Temporal = require('sequelize-temporal');

const Books = sequelize.define('books', {
  id:{
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: true,
		primaryKey: true
	},
  name: {
    type:Sequelize.STRING,
    notEmpty: true,
    allowNull: false,
    validate: {
      notEmpty: { args: true, msg: 'name cannot be null' }
    }
  },
  isbn13: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: { args: true, msg: 'isbn13 cannot be null' },
      len: {args:13, msg: 'isbn13 length should be 13'},
      isNumeric:{args:true, msg: 'isbn13 should be number'}
    }
  },
  isbn10: Sequelize.STRING,
  paper: Sequelize.BOOLEAN,
  audio: Sequelize.BOOLEAN,
  ebook: Sequelize.BOOLEAN,
  pages: {
    type:Sequelize.INTEGER,
    notEmpty: true,
    allowNull: false
  }
},
{
  getterMethods: {
    bookName() {
      return this.name + ' (' + this.isbn13 +')'
    }
  }
});

Temporal(Books, sequelize);

module.exports = Books;
