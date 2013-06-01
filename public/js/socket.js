//  ----------
//  Cat Cache!
//  ----------
//  
//  socket.js
//
//  © 2013 Cat Cache!

var loggedin = false;

$(document).ready(function() {
    // SOCKETS
    var socket = io.connect(':3000');
    socket.on('sessionx', function(data) {
	
    });


});