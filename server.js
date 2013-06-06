//  ----------
//  Cat Cache!
//  ----------
//  
//  server.js
//  
//  © 2013 Cat Cache!

var config = require('./config');
var express = require('express');
var util = require('util');

// Connect to database
var databaseUrl = 'catcache';
var collections = ['users'];
var db = require('mongojs').connect(databaseUrl, collections);
util.log('Connceted to database');

// Configure express
var app = express();	
app.configure(function() {
	app.locals.pretty = true;
	app.use(express.static(__dirname + '/public'));
	app.set('views', __dirname + '/views')
	app.set('view engine', 'jade')
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({
		key: config.key,
		secret: config.secret,
		maxAge: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)),
	})); 
	app.use(app.router);
});
util.log('Configured the application');

// Create the server
var server = require('http').createServer(app);

// Add the router
require('./router')(app, db);
util.log('Added routes');

// Create the server and listen
server.listen(config.port, '::');
util.log('Created server and listening on port '+config.port);
