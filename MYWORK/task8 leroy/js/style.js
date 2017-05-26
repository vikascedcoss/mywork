// $("document").ready(function(&){
	
// 	var nav = $('.nav');
	
// 	$(window).scroll(function () {
// 		if ($(this).scrollTop() > 136) {
// 			nav.addClass("nav-fix");
// 		} else {
// 			nav.removeClass("nav-fix");
// 		}
// 	});
 
// });

$(document).ready(function(){
				$('.scroll-up').click(function(){
					$('html, body').animate({scrollTop : 0},500);
					// return false;
				});
			});