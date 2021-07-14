var jsdom = require("jsdom");

$(document).ready(function() {
  
	$('.btn-open').click(function() {
		$('.modal-wrapper').addClass('open')
	});
  
	$('.btn-close').click(function() {
		$('.modal-wrapper').removeClass('open')
	});
  
});