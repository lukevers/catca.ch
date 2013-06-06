//  ----------
//  Cat Cache!
//  ----------
//  
//  user.js
//
// © 2013 Cat Cache!

$(document).ready(function(){
	
	// Hide the password thing on the start
	$('.pass').hide();
	
	// Show the password thing upon focusing/clicking on it
	$('#password').on('focus', function(event) {
		if ($('.pass').css('display') == 'none') $('.pass').slideToggle();
	});
	
	// Update the time it'll take to crack your password
	$('#password').bind('keyup', function(event) {
		$('#password').pwdstr('#time');
	});
	
	// Make the confirmed password a different color if the passwords don't match
	$('#c_password, #password').bind('keyup click', function(event) {
		if ($('#password').val() != $('#c_password').val()) {
				$('#c_password').addClass('warning');
		} else $('#c_password').removeClass('warning');
	});
	
	// Disable/enable button to sign up
	$(document).bind('keyup click', function(event) {
		var email = $('#email').val().trim();
		var uname = $('#username').val().trim();
		var pwrd1 = $('#password').val().trim();
		var pwrd2 = $('#c_password').val().trim();
		var check = $('#terms').is(':checked');
		
		if (email != '' && uname != '' && pwrd1 != '' && check) {
			if (pwrd1 == pwrd2) {
				$('#signup').removeAttr('disabled');
			} else {
				$('#signup').attr('disabled', 'disabled');
			}
		} else {
			$('#signup').attr('disabled', 'disabled');
		}
	});
	
});