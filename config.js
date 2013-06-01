//  ----------
//  Cat Cache!
//  ----------
//  
//  config.js
//  
//  © 2013 Cat Cache!

var config = require('./config.json');
var port = config.port;
var secret = config.secret;

exports.port = port;
exports.secret = secret;