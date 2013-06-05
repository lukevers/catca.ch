//  ----------
//  Cat Cache!
//  ----------
//  
//  pwd.js
//
// © 2013 Cat Cache!

var crypto = require('crypto');

exports.saltAndHash = function(pass) {	
	var salt = generateSalt();
	return (salt+hash(pass+salt));
}

exports.validatePass = function(hashedPass, plainPass) {
	var salt = hashedPass.substr(0,10);
	var validHash = salt + hash(plainPass + salt);
	return (hashedPass === validHash);
}

var generateSalt = function() {
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var hash = function(str) {
	return crypto.createHash('sha256').update(str).digest('hex');
}
