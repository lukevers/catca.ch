//  ----------
//  Cat Cache!
//  ----------
//  
//  router.js
//  
//  © 2013 Cat Cache!

var util = require('util');
var pwd = require('./pwd');

module.exports = function(app, db) {
	
	// -----------------------------------
	// ---------------POSTS---------------
	// -----------------------------------
		
	// Sign Up
	app.post('/user/signup', function(req, res) {
		// First check if username/email is already used.
		db.users.find({username: req.body.username}, function(err, users) {
			if (err || users.length == 0) {
				// User does not exist -- check email
				db.users.find({email: req.body.email}, function(errs, emails) {
					if (errs || emails.length == 0) {
						// Email does noe exist -- check for password correctness with both
						if (req.body.password == req.body.c_password) {
							var newuser = {email: req.body.email, username: req.body.username, password: pwd.saltAndHash(req.body.password)};
							db.users.save(newuser, function(err, saved) {
								if(err || !saved) {
									util.log('New user not saved: '+req.body.username);
									res.redirect('/user/signup#error');
								} else {
									util.log('New user saved: '+req.body.username);
									res.redirect('/user/signin');
								}
							});
						} else {
							// Passwords do not match	
							util.log(req.connection.remoteAddress+' tried to create an account with two unequal passwords');
							res.redirect('/user/signup#invalid_password');
						}
					} else {
						// Email exists	
						util.log(req.connection.remoteAddress+' tried to create an account with an email that is already taken: '+req.body.email);
						res.redirect('/user/signup#invalid');
					}
				});
			} else {
				// User exists
				util.log(req.connection.remoteAddress+' tried to create an account with a username that is already taken: '+req.body.username);
				res.redirect('/user/signup#invalid');
			}
		});
	});
	
	// Sign In
	app.post('/user/signin', function(req, res) {
		// 'user' can either be username or email, so we have to check for both
		var user = req.body.unamemail;
		var plain = req.body.password;
		var hashed = '';
				
		db.users.find({username: user}, function(err, users) {
		if (err || users.length == 0) {
			// Username not found -- check for email
			db.users.find({email: user}, function(error, emails) {
			if (error || emails.length == 0) {
				// Email not found -- user does not exist
				util.log(req.connection.remoteAddress+' tried to login using a non-existant username/email of: '+user);
				res.redirect('/user/signin#invalid');
			} else {
				// Email found -- check for password
				hashed = emails[0].password;
				if (pwd.validatePass(hashed, plain)) {
					// Password Correct
					req.session.user = emails[0];
					res.cookie('user', emails[0].username, { maxAge: new Date(Date.now() + 3600000) });
					res.cookie('password', emails[0].password, { maxAge: new Date(Date.now() + 3600000) });
					util.log(req.connection.remoteAddress+' logged in as '+user);
					res.redirect('/');
				} else {
					// Password incorrect
					util.log(req.connection.remoteAddress+' tried to login as '+user+' but with the wrong password');
					res.redirect('/user/signin#invalid');
				} 
			}
			});
		} else {
			// Username found -- check for password
			hashed = users[0].password;
			if (pwd.validatePass(hashed, plain)) {
				// Password Correct
				req.session.user = users[0];
				res.cookie('user', users[0].username, { maxAge: new Date(Date.now() + 3600000) });
				res.cookie('password', users[0].password, { maxAge: new Date(Date.now() + 3600000) });
				util.log(req.connection.remoteAddress+' logged in as '+user);
				res.redirect('/');
			} else {
				// Password incorrect
				util.log(req.connection.remoteAddress+' tried to login as '+user+' but with the wrong password');
				res.redirect('/user/signin#invalid');
			} 
		}
		});    
	});
	
	app.post('/user/recover', function(req, res) {
		// TODO
	});
	
	// -----------------------------------
	// ---------------GETS----------------
	// -----------------------------------
	
	// Home	
	app.get('/', function(req, res) {
		db.users.find({username: req.cookies.user, password: req.cookies.password}, function(err, users) {
			if (err || users.length == 0) {
				// Not Logged In
				res.render('index', { 'loggedin': 'false' });
			} else {
				// Logged In
				res.render('index', { 'loggedin': 'true' });
			}
		});
	});
	
	// Sign In
	app.get('/user/signin', function(req, res) {
		db.users.find({username: req.cookies.user, password: req.cookies.password}, function(err, users) {
			if (err || users.length == 0) {
				// Not Logged In
				res.render('signin', { 'loggedin': 'false' });
			} else {
				// Logged In
				res.render('signin', { 'loggedin': 'true' });
			}
		});
	});
	
	// Sign Up
	app.get('/user/signup', function(req, res) {
		db.users.find({username: req.cookies.user, password: req.cookies.password}, function(err, users) {
			if (err || users.length == 0) {
				// Not Logged In
				res.render('signup', { 'loggedin': 'false' });
			} else {
				// Logged In
				res.render('signup', { 'loggedin': 'true' });
			}
		});
	});
	
	// Sign Out
	app.get('/user/signout', function(req, res) {
		res.clearCookie('user');
		res.clearCookie('password');
		req.session.destroy(function(e){ 
			res.redirect('/'); 
		});
	});
	
	// Recover Password
	app.get('/user/recover', function(req, res) {
		db.users.find({username: req.cookies.user, password: req.cookies.password}, function(err, users) {
			if (err || users.length == 0) {
				// Not Logged In
				res.render('recover', { 'loggedin': 'false' });
			} else {
				// Logged In
				res.render('recover', { 'loggedin': 'true' });
			}
		});
	});
	
	// Account
	app.get('/user/account', function(req, res) {
		db.users.find({username: req.cookies.user, password: req.cookies.password}, function(err, users) {
			if (err || users.length == 0) {
				// Not Logged In
				res.render('account', { 'loggedin': 'false' });
			} else {
				// Logged In
				res.render('account', { 'loggedin': 'true' });
			}
		});
	});
	
}