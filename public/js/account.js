//  ----------
//  Cat Cache!
//  ----------
//  
//  account.js
//
// © 2013 Cat Cache!

$(document).ready(function(){
	
	$('#check2, .check2').hide();
	
	$('#check').bind('click', function(event) {
		if ($('#check').is(' :checked')) $('#check2, .check2').show();
		else $('#check2, .check2').hide();
	});
	
	$('#check2').bind('click', function(event) {
		if ($('#check').is(' :checked') && $('#check2').is(' :checked')) {
			$('.btn-danger').removeAttr('disabled');
		} else {
			$('.btn-danger').attr('disabled', 'disabled');
		}
	});
	
});