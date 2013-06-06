//  ----------
//  Cat Cache!
//  ----------
//  
//  account.js
//
// © 2013 Cat Cache!

$(document).ready(function(){
	
	// Hide the password thing on the start
	$('.pass').hide();
	
	// Show the password thing upon focusing/clicking on it
	$('#newp').on('focus', function(event) {
		if ($('.pass').css('display') == 'none') $('.pass').slideToggle();
	});
	
	// Update the time it'll take to crack your password
	$('#newp').bind('keyup', function(event) {
		$('#newp').pwdstr('#time');
	});
	
	// Make the confirmed password a different color if the passwords don't match
	$('#newp, #oldp').bind('keyup click', function(event) {
		if ($('#newp').val() == $('#oldp').val()) {
			$('#newp').addClass('warning');
			$('#newpass').attr('disabled', 'disabled');
		} else {
			 $('#newp').removeClass('warning');
			 if ($('#newp').val().length >= 8) {
				 $('#newpass').removeAttr('disabled');
			 } else {
				 $('#newpass').attr('disabled', 'disabled');
			 }
		}
	});
	
	// Hide the second checkbox
	$('#check2, .check2').hide();
	
	// Show/hide the second checkbox
	$('#check').bind('click', function(event) {
		if ($('#check').is(' :checked')) $('#check2, .check2').show();
		else $('#check2, .check2').hide();
	});
	
	// Disable/enable the delete button
	$('#check2, #check').bind('click', function(event) {
		if ($('#check').is(' :checked') && $('#check2').is(' :checked')) {
			$('.btn-danger').removeAttr('disabled');
		} else {
			$('.btn-danger').attr('disabled', 'disabled');
		}
	});
	
	// Disable/enable the submit button for email
	$('#newe').bind('keyup', function(event) {
		if ($('#newe').val().trim() == '') {
			$('#newemail').attr('disabled', 'disabled');
		} else $('#newemail').removeAttr('disabled');
	});
	
});