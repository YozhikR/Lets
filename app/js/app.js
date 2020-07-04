document.addEventListener("DOMContentLoaded", function () {

	firstSlider = document.querySelector('.swiper-container')

	let mySwiper = new Swiper(firstSlider, {
		slidesPerView: 1.1,
		//spaceBetween: 100,
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	})

});
