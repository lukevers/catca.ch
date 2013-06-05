//  ----------
//  Cat Cache!
//  ----------
//  
//  get.js
//  
//  © 2013 Cat Cache!

module.exports = function(app, db) {
	
	// Home	
	app.get('/', function(req, res) {
		if (typeof req.session.user == 'undefined') res.render('index', { 'loggedin': 'false' });
		else res.render('index', { 'loggedin': 'true', 'user': req.session.user });
	});
	
	// Sign In
	app.get('/user/signin', function(req, res) {
		if (typeof req.session.user == 'undefined') res.render('signin', { 'loggedin': 'false' });
		else res.render('signin', { 'loggedin': 'true', 'user': req.session.user });
	});
	
	// Sign Up
	app.get('/user/signup', function(req, res) {
		if (typeof req.session.user == 'undefined') res.render('signup', { 'loggedin': 'false' });
		else res.render('signup', { 'loggedin': 'true', 'user': req.session.user });
	});
	
	// Recover Password
	app.get('/user/recover', function(req, res) {
		if (typeof req.session.user == 'undefined') res.render('recover', { 'loggedin': 'false' });
		else res.render('recover', { 'loggedin': 'true', 'user': req.session.user });
	});
	
	// Account
	app.get('/user/account', function(req, res) {
		if (typeof req.session.user == 'undefined') res.render('account', { 'loggedin': 'false' });
		else res.render('account', { 'loggedin': 'true', 'user': req.session.user });
	});
	
	// Sign Out
	app.get('/user/signout', function(req, res) {
		req.session.destroy(function(e){ 
			res.redirect('/'); 
		});
	});
	
}