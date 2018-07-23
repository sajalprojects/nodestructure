var home = require('../app/controllers/home');
var userRouter = require('../app/modules/user');
var anonymousUserRouter = require('../app/modules/user/anonymous');
var bookRouter = require('../app/modules/books');
//you can include all your controllers

module.exports = function (app, passport) {
  let authMiddleware = function(req, res, next){
    passport.authenticate('jwt', function(err, user) {

      if(err) { return res.json({err:err}); }
      if(!user) { return res.json({err:'unauthenticated'}); }
      if(!err && user) {
        res.session = {
          user:user
        };
        return next();
      }

    })(req, res, next);
  };

  app.use('/api/v1',anonymousUserRouter);
  app.use('/api/v1',authMiddleware, userRouter);
  app.use('/api/v1',authMiddleware, bookRouter);
  app.get('/test', authMiddleware, home.testsql);//home
}
