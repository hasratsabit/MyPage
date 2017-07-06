import $ from "jquery";


const DropDown = (function() {

		const dropdown = document.getElementsByClassName('dropdown');

	$(dropdown).on('click', function() {
		const child = $(this).children('ul');
		const arrow = $(this).find('div');
		$(arrow).toggleClass('arrow-down--is-rotated')
		$(child).toggleClass('drop-item--is-open')
	})

}());


// $('.dropdown').click(function() {
// 	const dropItem = document.getElementById('drop-item');
// 	const arrow = document.getElementById('arrow-down');
//
// 	if(dropItem.className === 'drop-item' && arrow.className === 'arrow-down'){
//
// 		$(dropItem).addClass('drop-item--is-open');
// 		$(arrow).addClass('arrow-down--is-rotated')
//
// 	}else {
// 		$(dropItem).removeClass('drop-item--is-open');
// 		$(arrow).removeClass('arrow-down--is-rotated')
// 	}
// })
