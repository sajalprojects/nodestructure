'use strict';
//const Sequelize 	= require('sequelize');
const {Sequelize, sequelize} 					= require('../../../lib/dbcon');
const bcrypt   		= require('bcrypt-nodejs');

const User = sequelize.define('users', {
	id:{
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: true,
		primaryKey: true
	},
	username: {
    type: Sequelize.STRING,
		allowNull: false
  },
	fname: {
    type: Sequelize.STRING,
		allowNull: false
  },
	lname: {
    type: Sequelize.STRING,
		allowNull: true
  },
	mail: {
    type: Sequelize.STRING,
		allowNull: false
  },
	password: {
    type: Sequelize.STRING
  },
	status: {
    type: Sequelize.INTEGER,
		default: 0
  },
	active_hash:{
		type: Sequelize.STRING
	},
	role_id: {
		type: Sequelize.INTEGER,
		default: 2
	}
},
{
	timestamps: true,
	tableName: 'users',
	version: true,
	deletedAt: 'delAt',
  paranoid: true,

  getterMethods: {
    fullName() {
      return this.fname + ' ' + (this.lname || "")
    }
  }
});


User.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
User.validPassword = function(password) {
 return bcrypt.compareSync(password, this.password);
};

User.comparePassword = function(password, user, cb) {
	// console.log("called =========================>", user.password)
	if(password == user.password){
		cb(null, true);
	}else{
		cb({err:"mismatch"},false);
	}
};

module.exports = User;
