document.addEventListener("DOMContentLoaded", function () {

	firstSlider = document.querySelector('.swiper-container')

	let mySwiper = new Swiper(firstSlider, {
		slidesPerView: 1.1,
		//spaceBetween: 100,
		loop: true,
		//autoplay: {
		//	delay: 5000,
		//},
		on: {
			slideChangeTransitionStart: function () {
				bannerText();
			},
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
			},
		}
	})

});

bannerText();
function bannerText() {
	var id = $('.first-section .swiper-slide-active').data("id");
	$('.first-section__headline-title').fadeOut().promise().done(function () {
		$('.first-section__headline-title[data-id=' + id + ']').fadeIn();
	});
}