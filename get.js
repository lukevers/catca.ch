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
		if (typeof req.session.user == 'undefined') res.render('signin', { 'loggedin': 'false' });
		else res.render('signin', { 'loggedin': 'true', 'user': req.session.user });
	});
	
	// Sign Up
	app.get('/signup', function(req, res) {
		if (typeof req.session.user == 'undefined') res.render('signup', { 'loggedin': 'false' });
		else res.render('signup', { 'loggedin': 'true', 'user': req.session.user });
	});
	
	// Recover Password
	app.get('/recover', function(req, res) {
		if (typeof req.session.user == 'undefined') res.render('recover', { 'loggedin': 'false' });
		else res.render('recover', { 'loggedin': 'true', 'user': req.session.user });
	});
	
	// Account
	app.get('/account', function(req, res) {
		if (typeof req.session.user == 'undefined') res.render('account', { 'loggedin': 'false' });
		else res.render('account', { 'loggedin': 'true', 'user': req.session.user });
	});
	
	// Upload
	app.get('/upload', function(req, res) {
		
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