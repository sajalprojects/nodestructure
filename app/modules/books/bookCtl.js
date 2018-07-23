'use strict';
let books = require('./bookMdl');
var appRoot = require('app-root-path');
let redis = require('../../../config/redis');
var winston = require('winston');
let logger = require('../../../config/winston');


exports.cacheGetAll = function(req, res, next){

	if(!redis.connection){
		req.cache = {
			books: undefined
		};
		next();
	}else{
		redis.client.get("books", function (err, obj) {
			req.cache = {
				books: JSON.parse(obj)
			};
			if(obj == null){
				next();
			}else{
				res.json({dataset:JSON.parse(obj)});
			}
		});
	}
}

exports.getAll = function(req, res){
	logger.bookLogger.debug('info:','book getAll');
	try{
		
		books
			.findAll({
				order: [
            ['id', 'DESC']
        ]
			})
			.then(function(dataset){
				if(redis.connection)
					redis.client.set("books", JSON.stringify(dataset));
				res.json({dataset:dataset});
			}).catch(err=>{
				res.json({err:err.errors});
			});

	}catch(e){
		logger.bookLogger.debug('error:','book getAll',e);
	}
}

exports.getById = function(req, res){

	let bookId = req.params.bookId;
	logger.bookLogger.debug('info:','book getById id=>', bookId);
	books
		.findAll({where:{
				id: bookId
			}
		})
		.then(function(dataset){
			res.json({dataset:dataset});
		}).catch(err=>{
			res.json({err:err.errors});
		});
}

exports.create = function(req, res){
	logger.bookLogger.debug('info:','book create param=>', req.body);
	books.create({
		name			: req.body.name,
	  isbn13		: req.body.isbn13,
	  isbn10		: req.body.isbn10,
	  paper			: req.body.paper,
	  audio			: req.body.audio,
	  ebook			: req.body.ebook,
	  pages			: req.body.pages
	}).then(book=>{
		res.json({dataset:book});
	}).catch(err=>{
		res.json({err:err.errors});
	});
}

exports.update = function(req, res){

	let bookId = req.params.bookId;
	logger.bookLogger.debug('info:','book update id',bookId, req.body);
	books.update({
		name			: req.body.name,
	  isbn13		: req.body.isbn13,
	  isbn10		: req.body.isbn10,
	  paper			: req.body.paper,
	  audio			: req.body.audio,
	  ebook			: req.body.ebook,
	  pages			: req.body.pages
	},{
		where: {id:bookId}
	}).then((book)=>{
		res.json({dataset:book});
	}).catch(err=>{
		res.json({err:err.errors});
	});
}

exports.delete = function(req, res){
	let bookId = req.params.bookId;
	books.destroy({
		where: {id:bookId}
	}).then((book)=>{
		res.json({dataset:book});
	}).catch(err=>{
		res.json({err:err.errors});
	});
}
