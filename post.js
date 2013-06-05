//  ----------
//  Cat Cache!
//  ----------
//  
//  post.js
//  
//  © 2013 Cat Cache!

var pwd = require('./pwd');
var util = require('util');


module.exports = function(app, db) {

	// Sign Up
	app.post('/user/signup', function(req, res) {
		// Only users that are signed out can create new accounts
		// So if someone is signed in, redirect them to their account
		if (typeof req.session.user == 'undefined') {
			// First check if username/email is already used.
			db.users.find({username: req.body.username}, function(err, users) {
				if (err || users.length == 0) {
					// User does not exist -- check email
					db.users.find({email: req.body.email}, function(errs, emails) {
						if (errs || emails.length == 0) {
							// Email does not exist -- check for password correctness of the two.
							// It will not let you submit if both are wrong, but there's a chance
							// Someone could edit the javascript and fuck things up -- so we want
							// To double check anyways.
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
		} else {
			// User is currently signed in and trying to sign up
			util.log(req.connection.remoteAddress+' tried to sign up when they are already signed in.');
			res.redirect('/user/account');
		}
	});
	
	// Sign In
	app.post('/user/signin', function(req, res) {
		// Only users that are signed out can sign in
		// So if someone is signed in, redirect them to their account
		if (typeof req.session.user == 'undefined') {
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
						req.session.cookie.originalMaxAge = new Date(Date.now() + (365 * 24 * 60 * 60 * 1000));
						req.session.cookie.expires = new Date(Date.now() + (365 * 24 * 60 * 60 * 1000));
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
					req.session.cookie.originalMaxAge = new Date(Date.now() + (365 * 24 * 60 * 60 * 1000));
					req.session.cookie.expires = new Date(Date.now() + (365 * 24 * 60 * 60 * 1000));
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
			// User is currently signed in and trying to sign in
			util.log(req.connection.remoteAddress+' tried to sign in when they are already signed in.');
			res.redirect('/user/account');
		}
	});
	
	// Recover Password
	app.post('/user/recover', function(req, res) {
		// Only users that are signed out can recover their password
		// So if someone is signed in, redirect them to their account
		if (typeof req.session.user == 'undefined') {
			var user = req.body.username;
			// TODO
		} else {
			// User is currently signed in and trying to recover their password
			util.log(req.connection.remoteAddress+' tried to recover their password when they are already signed in.');
			res.redirect('/user/account');
		}
	});
	
	// Change Email
	app.post('/user/email', function(req, res) {
		// Only users that are signed in can change their email
		// So if someone is signed out, redirect them to the signin page
		if (typeof req.session.user == 'undefined') {
			// User is currently signed out and trying to change their email
			util.log(req.connection.remoteAddress+' tried to change their email when they are not signed in.');
			res.redirect('/user/signin#not_logged_in');
		} else {
			var newemail = req.body.email;
			var user = req.session.user;
			// TODO
		}
	});
	
	// Change Password
	app.post('/user/password', function(req, res) {
		// Only users that are signed in can change their password
		// So if someone is signed out, redirect them to the signin page
		if (typeof req.session.user == 'undefined') {
			// User is currently signed out and trying to change their password
			util.log(req.connection.remoteAddress+' tried to change their password when they are not signed in.');
			res.redirect('/user/signin#not_logged_in');
		} else {
			var oldp = req.body.oldp;
			var newp = req.body.newp;
			var user = req.session.user;
			// TODO
		}
	});
	
	// Delete Account
	app.post('/user/delete', function(req, res) {
		// Only users that are signed in can delte their account
		// So if someone is signed out, redirect them to the signin page
		if (typeof req.session.user == 'undefined')  {
			res.redirect('/user/signin#not_logged_in');
		} else {
			var user = req.session.user;
			db.users.remove({username: user.username, password: user.password, email: user.email});
			util.log(req.connection.remoteAddress+' deleted the user '+user);
			res.redirect('/user/signout');
		}
	});
	
}