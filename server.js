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
var collections = ['users'];
var db = require('mongojs').connect(databaseUrl, collections);

// Configure
var app = express();

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
	secret: config.secret,
	maxAge: new Date(Date.now() + 3600000),
	store: new MongoStore({ db: databaseUrl, collection: 'sessions' })
    }));
    app.use(app.router);
});

// Set up socket.io
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
    socket.on('app', function(data) {
	
    });
});

app.post('/user/signup', function(req, res) {
    // TODO: encrypt password
    var newuser = {email: req.body.email, username: req.body.username, password: req.body.password};
    db.users.save(newuser, function(err, saved) {
	if( err || !saved ) util.log("User not saved");
	else util.log("User saved");
    });
    
});

app.post('/user/signin', function(req, res) {
    // TODO: sign in
});

app.get('/', function(req, res) {
    res.render('index', function(err, html) {
	
    });
});

server.listen(config.port);