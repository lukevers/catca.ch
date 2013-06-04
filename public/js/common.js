//  ----------
//  Cat Cache!
//  ----------
//  
//  common.js
//
// © 2013 Cat Cache!

var quotes = ['Quantifying Cuteness', 'The Computational Cuteness Engine', 'Delivering D\'awws With Precision'];

$(document).ready(function(){
	    
    // Random slogan upon load
    $('#slogan').html(quotes[Math.floor(Math.random()*quotes.length)]);
    
    // Random slogan upon click
    $('#slogan').bind('click', function() {
		randomSlogan();
    });
    
    // Search for cats on the main page
    $('#search').keyup(function(event){
		if (event.keyCode == 13) $('#submit').click();
    });
    
    // Center always
    $(window).resize(function(){
		$('.center').css({
			position:'absolute',
			left: ($(window).width() 
			   - $('.center').outerWidth())/2,
			top: ($(window).height() 
			  - $('.center').outerHeight())/2
		});
    });
    $(window).resize();
    $(window).resize();

});

function searchForKittens() {
    var terms = $('#search').val().split(' ');
    alert(terms);
}

function randomSlogan() {
    var thisQuote = $('#slogan').html();
    var nextQuote = quotes[Math.floor(Math.random()*quotes.length)];
    if (thisQuote == nextQuote) randomSlogan();
    else {
		$('#slogan').fadeTo('normal', 0, function() {
			$('#slogan').html(nextQuote);
		});
		$('#slogan').fadeTo('normal', 1);
    }
}