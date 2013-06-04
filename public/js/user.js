//  ----------
//  Cat Cache!
//  ----------
//  
//  user.js
//
// © 2013 Cat Cache!

$(document).ready(function(){
	    
	// Disable/undisable the button to sign up
	$('#terms').bind('click', function(event) {
		if ($('#terms').is(':checked')) {
			$('#signup').removeAttr('disabled');
		} else {
			$('#signup').attr('disabled', 'disabled');
		} 
	});
	
});