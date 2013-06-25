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
	app.get('/signin', function(req, res) {
		if (typeof req.session.user == 'undefined') res.render('signin');
		else res.redirect('/account');
	});
	
	// Sign Up
	app.get('/signup', function(req, res) {
		if (typeof req.session.user == 'undefined') res.render('signup');
		else res.redirect('/account');
	});
	
	// Recover Password
	app.get('/recover', function(req, res) {
		if (typeof req.session.user == 'undefined') res.render('recover');
		else res.redirect('/account');
	});
	
	// Account
	app.get('/account', function(req, res) {
		if (typeof req.session.user == 'undefined') res.redirect('/signin#not_logged_in');
		else res.render('account', { 'user': req.session.user });
	});
	
	// Upload
	app.get('/upload', function(req, res) {
		if (typeof req.session.user == 'undefined') res.redirect('/signin#not_logged_in');
		else res.render('upload', { 'user': req.session.user });
	});
	
	// Status	
	app.get('/status', function(req, res) {
		if (typeof req.session.user == 'undefined') res.render('status', { 'loggedin': 'false' });
		else res.render('status', { 'loggedin': 'true', 'user': req.session.user });
	});
	
	// Liked By
	app.get('/liked/by/*', function(req, res) {
		
	});
	
	// Posted By
	app.get('/posted/by/*', function(req, res) {
		
	});
	
	// Sign Out
	app.get('/signout', function(req, res) {
		req.session.destroy(function(e){ 
			res.redirect('/'); 
		});
	});
	
	// 404
	app.get('*', function(req, res){
		res.render('404');
	});
	
}