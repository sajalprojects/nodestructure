let users = require('./userMdl');
var appRoot = require('app-root-path');
var winston = require('winston');
let logger = require('../../../config/winston');
var jwt = require('jsonwebtoken');
var env = require('dotenv').load();

exports.getAll = function(req, res){
	logger.userLogger.debug('info:',' getAll');
	try{
		// console.log("SESSION", res.session.user);
		users
			.findAll({
				order: [
            ['id', 'DESC']
        ],
				attributes: {
        	exclude: ['password','role_id', 'active_hash']
    		}
			})
			.then(function(dataset){
				res.json({dataset:dataset});
			}).catch(err=>{
				res.json({err:err.errors});
			});

	}catch(e){
		logger.userLogger.debug('error:',' getAll',e);
	}
}

exports.getById = function(req, res){

	let userId = req.params.userId;
	logger.userLogger.debug('info:','book userId id=>', userId);
	users
		.findAll({where:{
				id: userId
			}
		})
		.then(function(dataset){
			res.json({dataset:dataset});
		}).catch(err=>{
			res.json({err:err.errors});
		});
}

exports.create = function(req, res){
	logger.userLogger.debug('info:','book create param=>', req.body);
	users.create({
		username			: req.body.username,
		fname					: req.body.fname,
	  lname					: req.body.lname,
	  mail					: req.body.mail,
	  status				: req.body.status,
	  createdAt			: req.body.createdAt,
	  password			: req.body.password,
		role_id				: req.body.role_id || 0
	}).then(book=>{
		res.json({dataset:book});
	}).catch(err=>{
		res.json({err:err.errors});
	});
}

exports.update = function(req, res){

	let userId = req.params.userId;
	logger.userLogger.debug('info:','book update id',userId, req.body);
	users.update({
		username			: req.body.username,
		fname					: req.body.fname,
	  lname					: req.body.lname,
	  mail					: req.body.mail,
	  status				: req.body.status,
	  createdAt			: req.body.createdAt,
	  password			: req.body.password,
		role_id				: req.body.role_id || 0
	},{
		where: {id:userId}
	}).then((book)=>{
		res.json({dataset:book});
	}).catch(err=>{
		res.json({err:err.errors});
	});
}

exports.delete = function(req, res){
	let userId = req.params.userId;
	users.destroy({
		where: {id:userId}
	}).then((user)=>{
		res.json({dataset:user});
	}).catch(err=>{
		res.json({err:err.errors});
	});
}


exports.signup = function(req, res){
	res.json({dataset:req.body});
}

exports.login = function(req, res) {
  users.findOne({where:{
    mail: req.body.mail
  }}).then(function( user) {

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      users.comparePassword(req.body.password,user, function (err, isMatch) {
				// console.log(err, isMatch)
        if (isMatch && !err) {
          // if user is found and password is right create a token
					var token = jwt.sign({ user: user }, process.env.SECRET, { expiresIn: '1h' });
          // return the information including token as JSON
          res.json({success: true, token: 'jwt '+token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong credentials.'});
        }
      });
    }
  }).catch(err=>{
		res.json({error:err});
	});
}
