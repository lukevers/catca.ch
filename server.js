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

// Configure
var app = express();

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
});

var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.get('/', function(req, res) {
    res.render('index', function(err, html) {
	
    });
});

server.listen(config.port);