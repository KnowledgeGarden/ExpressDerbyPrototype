/**
 * routes
 * Idea from:
 * http://scotch.io/tutorials/javascript/easy-node-authentication-setup-and-local
 */
	var home = require('./index'),
	    admin = require('./admin'),
	    user  = require('./user'),
	    bkmrk = require('./bkmrk'),
	    login = require('./login'),
	    signup = require('./signup');
var passport = require('passport')
	, Account = require('../apps/models/account')
	, LocalStrategy = require('passport-local').Strategy;
	
//	var url = require('url');
module.exports = function(app, passport) {
	////////////////////////////////////////
	// We have three "main" templates:
	//   main.handlebars for unauthenticated views
	//   mainauth.handlebars for authenticated views
	//   mainadmin.handlebars for authenticated views by admins
	////////////////////////////////////////
	
    // =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', home.index);  	//look for index.handlebars
	// =====================================
	// Admin ===============================
	// =====================================
	app.get('/admin', admin.admin); //look for admin.handlebars
	// =====================================
	// Users ===============================
	// =====================================
	app.get('/users', user.list);
	// =====================================
	// Bookmarks ===============================
	// =====================================
	app.get('/bkmrk', bkmrk.bkmrk); //look for bkmrk.handlebars

	
	
	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', login.login);
	// process the login form
	passport.use(new LocalStrategy(function(email,password,done){
        console.log(email+"//"+password+" is trying to login as local.");
        Account.findOne({'email':email})
            .exec(function(err,puser){
                if(err){log.info(err.stack);}
                if(!puser){
                    log.info("user not found.");
                    return done(null, false, { message: 'Unknown user ' + username });
                }
                if (password!==puser.password) {
                    log.info("password invalid.");
                    return done(null, false, { message: 'Invalid password' });
                }
                return done(null, puser);
        });
    }));
//	app.post('/login', passport.authenticate('local'), function(req, res) {
//		if (err) {
//			console.log("LOGIN ERR: "+err);
//			res.redirect('/login');
//		} else
//			res.redirect('/');
//	});
	
	app.post('/login',
			  passport.authenticate('local', { successRedirect: '/',
			                                   failureRedirect: '/login'}) //,
			                                  // failureFlash: true })
			);
	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', signup.signup);
	app.post('/signup', function(req,res) {
	    Account.register(new Account({ 
	    	email : req.body.email,
	    	fullname : req.body.fullname,
	    	username : req.body.handle,
	    	avatar : req.body.avatar,
	    	homepage : req.body.homepage
	    	}), req.body.password, function(err, account) {
	        if (err) {
	        	console.log("ROUTE ERROR "+err);
	            return res.render('signup', { account : account });
	        }

	        passport.authenticate('local')(req, res, function () {
	          res.redirect('/');
	        });
	    });
		
	});
/**
 Express server listening on port 3000
{ email: 'jackpark@topicquests.org',
  fullname: 'Jack Park',
  handle: 'gardener',
  avatar: 'foo',
  homepage: 'http://knowledgegardens.wordpress.com/',
  password: '' }
 */
	// =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}