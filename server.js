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
var app = express().configure(function() {
    app.use(express.static(__dirname + 'public'));
    app.use(app.router);
});
