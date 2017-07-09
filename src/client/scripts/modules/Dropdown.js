$(document).ready(function(){

	$('.drop-content').hide();

	$('.drop-link').click(function() {
		var content = $(this).find('.drop-content')
		var arrow = $(this).find('.arrow');

		if(!$(this).hasClass('active')){

			$(this).addClass('active')
			$(content).slideDown();
			$(arrow).addClass('arrow--is-opened');

		}else {

			$(this).removeClass('active');
			$(content).slideUp();
			$(arrow).removeClass('arrow--is-opened');

		}
	});
 });
