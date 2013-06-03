//  ----------
//  Cat Cache!
//  ----------
//  
//  socket.js
//
//  © 2013 Cat Cache!

var loggedin = false;

$(document).ready(function() {
	
    var socket = io.connect(':3000');
	
    socket.on('loggedin', function(data) {
		loggedin = data;
    });	
	
	socket.emit('cookie', getCookies());
		
});

function getCookies() {	
	return {username: readCookie('user'), password: readCookie('password')};
}

function readCookie(name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}