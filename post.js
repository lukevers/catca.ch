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
										util.log(req.ip+ ' tried to create a new user, '+req.body.username+', but recieved an error.');
										res.redirect('/user/signup#error');
									} else {
										util.log(req.ip+' created a new user: '+req.body.username);
										res.redirect('/user/signin');
									}
								});
							} else {
								// Passwords do not match	
								util.log(req.ip+' tried to create an account with two unequal passwords');
								res.redirect('/user/signup#invalid_password');
							}
						} else {
							// Email exists	
							util.log(req.ip+' tried to create an account with an email that is already taken: '+req.body.email);
							res.redirect('/user/signup#invalid');
						}
					});
				} else {
					// User exists
					util.log(req.ip+' tried to create an account with a username that is already taken: '+req.body.username);
					res.redirect('/user/signup#invalid');
				}
			});
		} else {
			// User is currently signed in and trying to sign up
			util.log(req.ip+' tried to sign up when they are already signed in.');
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
					util.log(req.ip+' tried to login using a non-existant username/email of: '+user);
					res.redirect('/user/signin#invalid');
				} else {
					// Email found -- check for password
					hashed = emails[0].password;
					if (pwd.validatePass(hashed, plain)) {
						// Password Correct
						req.session.user = emails[0];
						req.session.cookie.originalMaxAge = new Date(Date.now() + (365 * 24 * 60 * 60 * 1000));
						req.session.cookie.expires = new Date(Date.now() + (365 * 24 * 60 * 60 * 1000));
						util.log(req.ip+' logged in as '+user);
						res.redirect('/');
					} else {
						// Password incorrect
						util.log(req.ip+' tried to login as '+user+' but with the wrong password');
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
					util.log(req.ip+' logged in as '+user);
					res.redirect('/');
				} else {
					// Password incorrect
					util.log(req.ip+' tried to login as '+user+' but with the wrong password');
					res.redirect('/user/signin#invalid');
				} 
			}
			});    
		} else {
			// User is currently signed in and trying to sign in
			util.log(req.ip+' tried to sign in when they are already signed in.');
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
			util.log(req.ip+' tried to recover their password when they are already signed in.');
			res.redirect('/user/account');
		}
	});
	
	// Change Email
	app.post('/user/email', function(req, res) {
		// Only users that are signed in can change their email
		// So if someone is signed out, redirect them to the signin page
		if (typeof req.session.user == 'undefined') {
			// User is currently signed out and trying to change their email
			util.log(req.ip+' tried to change their email when they are not signed in.');
			res.redirect('/user/signin#not_logged_in');
		} else {
			var newemail = req.body.email;
			var user = req.session.user;
			// If the new email is the same as the old email, don't update it.
			// Also, if the email is blank, don't update it.
			if (newemail == user.email || newemail == '') {
				// User tried to change their email to what they already have
				util.log(req.ip+' tried to change their email to the same thing.');
				res.redirect('/user/account#invalid');
			} else {
				db.users.find({email: newemail}, function(err, emails) {
					if (err || emails.length == 0) {
						// Email is not in use -- change email
						db.users.update({username: user.username, password: user.password}, {$set: {email: newemail}}, function(err, updated) {
							if (err || updated.length == 0) {
								// Something went wrong
								util.log(req.ip+' tried to change their email, but there was an error.');
								res.redirect('/user/account#invalid');
							} else {
								// Email changed
								util.log(req.ip+' changed their email from '+req.session.user.email+' to '+newemail);
								req.session.user.email = newemail;
								res.redirect('/user/account#success');
							}
						});
					} else {
						// New email is already in use
						util.log(req.ip+' tried to change their email to '+newemail+', but that email is already in use');
						res.redirect('/user/account#invalid');
					}
				});
			}
		}
	});
	
	// Change Password
	app.post('/user/password', function(req, res) {
		// Only users that are signed in can change their password
		// So if someone is signed out, redirect them to the signin page
		if (typeof req.session.user == 'undefined') {
			// User is currently signed out and trying to change their password
			util.log(req.ip+' tried to change their password when they are not signed in.');
			res.redirect('/user/signin#not_logged_in');
		} else {
			var oldp = req.body.oldp;
			var newp = req.body.newp;
			var user = req.session.user;
			if (oldp == '' || newp == '') {
				// Either the old passwod or the new password was empty
				util.log(req.ip+' tried to change their password, but one of the forms was empty.');
				res.redirect('/user/account#invalid');
			} else if (oldp == newp) {
				// User tried to change their password to what they already have
				util.log(req.ip+' tried to change their password to the same thing.');
				res.redirect('/user/account#invalid');
			} else {
				if (pwd.validatePass(user.password, oldp)) {
					var newpassword = pwd.saltAndHash(newp);
					db.users.update({username: user.username, email: user.email}, {$set: {password: newpassword}}, function(err, updated) {
						if (err || updated.length == 0) {
							// Something went wrong
							util.log(req.ip+' tried to change their password, but there was an error.');
							res.redirect('/user/account#invalid');
						} else {
							// Password changed
							util.log(req.ip+' changed their password');
							req.session.user.password = newpassword;
							res.redirect('/user/account#success');
						}
					});
				} else {
					// User tried to change their password, but the old password
					// They provided was not the correct password
					util.log(req.ip+' tried to change their password, but their old password was not correct.');
					res.redirect('/user/account#invalid');
				}
			}
		}
	});
	
	// Change Name
	app.post('/user/name', function(req, res) {
		// Only users that are signed in can change their name
		// So if someone is signed out, redirect them to the signin page
		if (typeof req.session.user == 'undefined') {
			// User is currently signed out and trying to change their name
			util.log(req.ip+' tried to change their name when they are not signed in.');
			res.redirect('/user/signin#not_logged_in');
		} else {
			var fname = req.body.fname;
			var lname = req.body.lname;
			var user = req.session.user;
			var name = fname.substring(0,1).toUpperCase()+fname.substring(1).toLowerCase()+' '+ lname.substring(0,1).toUpperCase()+lname.substring(1).toLowerCase();
			if (name == ' ') name = '';
			db.users.update({username: user.username, email: user.email}, {$set: {name: name}}, function(err, updated) {
				if (err || updated.length == 0) {
					// Something went wrong
					util.log(req.ip+' tried to change their name, but there was an error.');
					res.redirect('/user/account#invalid');
				} else {
					// Name changed
					util.log(req.ip+' changed their name from '+user.name+' to '+name);
					req.session.user.name = name;
					res.redirect('/user/account#success');
				}
			});

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
			util.log(req.ip+' deleted the user '+user);
			res.redirect('/user/signout');
		}
	});
	
}