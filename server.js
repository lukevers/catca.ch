//  ----------
//  Cat Cache!
//  ----------
//  
//  server.js
//  
//  © 2013 Cat Cache!

var config = require('./config');
var express = require('express');
var MongoStore = require('connect-mongo')(express);
var mongo = require('mongoose');
var util = require('util');

// Connect to database
var databaseUrl = 'catcache';
var collections = ['users', 'sessions'];
var db = require('mongojs').connect(databaseUrl, collections);
util.log('Connceted to database.');

// Configure express
var app = express();	
app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
		secret: config.secret,
		key: 'express.sid',
		maxAge: new Date(Date.now() + 3600000),
		store: new MongoStore({ db: databaseUrl, collection: 'sessions' })
    	})); 
    app.use(app.router);
});
util.log('Configured the application.');

var server = require('http').createServer(app)

// Add the router
require('./router')(app, db);
util.log('Added routes.');

// Create the server and listen
server.listen(config.port, '::');
util.log('Created server and listening on port '+config.port);