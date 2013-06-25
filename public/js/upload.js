//  ----------
//  Cat Cache!
//  ----------
//  
//  upload.js
//
// © 2013 Cat Cache!

$(document).ready(function(){
	
	$('#upload').hide();
	
	$('#choose').bind('click', function(event) {
		$('#filebrowse').click();
	});
	
	$('#filebrowse').bind('change', function(event) {
		$('.files').html('');
		var files = $.map($('#filebrowse').prop('files'), function(val) { return val.name; });
		$('.files').prepend('<br/>');
		for (x in files) {
			$('.files').append('<div class="alert">'+files[x]+'</div>');
		}
		$('#upload').fadeIn();
	});
	
	$('#upload').bind('click', function(event) {
		
	});
	
});