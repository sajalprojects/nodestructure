var LocalStrategy   = require('passport-local').Strategy;
var JwtStrategy     = require('passport-jwt').Strategy;
var ExtractJwt      = require('passport-jwt').ExtractJwt;
var User            = require('../app/modules/user/userMdl');
var env             = require('dotenv').load();

// var configAuth = require('./auth.js');
// var constant = require('../config/constants');
// var dateFormat = require('dateformat');
// var fs = require('fs');
// var bcrypt = require('bcrypt-nodejs');


//expose this function to our app using module.exports
module.exports = function(passport) {


    // =========================================================================
    // JWT LOGIN ===============================================================
    // =========================================================================
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = process.env.SECRET;
    // opts.issuer = 'accounts.examplesoft.com';
    // opts.audience = 'yoursite.net';
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      // console.log("Strategy ===> ",jwt_payload.user.id);
      User.findOne({where:{ 'id' :  jwt_payload.user.id }}).then(function(user) {
        if(user){
          // console.log("TEST",jwt_payload.user );
          return done(null, jwt_payload.user);
        }else {
          return done(null, false);
        }
      }).catch(err=>{
    		return done(err, false);
    	});
    }));

};
