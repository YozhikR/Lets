document.addEventListener("DOMContentLoaded", function () {

	firstSlider = document.querySelector('.swiper-container');
	stagesSlider = document.querySelector('.stages-swiper-container');
	trioSlider = document.querySelector('.trio-swiper-container');

	let mySwiper = new Swiper(firstSlider, {
		slidesPerView: 1.1,
		//spaceBetween: 100,
		loop: true,
		autoplay: {
			delay: 5000,
		},
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
	bannerText();
	function bannerText() {
		var id = $('.first-section .swiper-slide-active').data("id");
		$('.first-section__headline-title').fadeOut().promise().done(function () {
			$('.first-section__headline-title[data-id=' + id + ']').fadeIn();
		});
	}

	let stagesSwiper = new Swiper(stagesSlider, {
		slidesPerView: 1,
		//spaceBetween: 100,
		//wrapperClass: 'stages-swiper-wrapper',
		slideClass: 'stages-swiper-slide',
		loop: true,
		effect: "fade",
		autoplay: {
			delay: 3000,
		},
		//on: {
		//	slideChangeTransitionStart: function () {
		//		bannerText();
		//	},
		//},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		//navigation: {
		//	nextEl: '.swiper-button-next',
		//	prevEl: '.swiper-button-prev',
		//},
		//breakpoints: {
		//	320: {
		//		slidesPerView: 1,
		//	},
		//}
	})

	let trioSwiper = new Swiper(trioSlider, {
		slidesPerView: 3,
		//spaceBetween: 100,
		//wrapperClass: 'stages-swiper-wrapper',
		//slideClass: 'stages-swiper-slide',
		//loop: true,
		//autoplay: {
		//	delay: 3000,
		//},
		on: {
			slideChangeTransitionStart: function () {
				bannerTextTrio();
			},
		},
		//pagination: {
		//	el: '.swiper-pagination',
		//	type: 'bullets',
		//	clickable: true,
		//},
		//navigation: {
		//	nextEl: '.swiper-button-next',
		//	prevEl: '.swiper-button-prev',
		//},
		breakpoints: {
			320: {
				slidesPerView: 1,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				spaceBetween: 100,
			},
			1025: {
				slidesPerView: 3,
				spaceBetween: 0,
			},
		}
	})

	bannerTextTrio();
	function bannerTextTrio() {
		var idTrio = $('.third-section .swiper-slide-active').data("idtrio");
		$('.third-section__slider-title').fadeOut().promise().done(function () {
			$('.third-section__slider-title[data-idtrio=' + idTrio + ']').fadeIn();
		});
	}

	const popupLinks = document.querySelectorAll('.popup-link');
	const body = document.querySelector('body');
	const lockPadding = document.querySelectorAll(".lock-padding");

	let unlock = true;

	const timeout = 800;

	if (popupLinks.length > 0) {
		for (let index = 0; index < popupLinks.length; index++) {
			const popupLink = popupLinks[index];
			popupLink.addEventListener("click", function (e) {
				const popupName = popupLink.getAttribute('href').replace('#', '');
				const curentPopup = document.getElementById(popupName);
				popupOpen(curentPopup);
				e.preventDefault();
			});
		}
	}
	const popupCloseIcon = document.querySelectorAll('.close-popup');
	if (popupCloseIcon.length > 0) {
		for (let index = 0; index < popupCloseIcon.length; index++) {
			const el = popupCloseIcon[index];
			el.addEventListener('click', function (e) {
				popupClose(el.closest('.popup'));
				e.preventDefault();
			});
		}
	}

	function popupOpen(curentPopup) {
		if (curentPopup && unlock) {
			const popupActive = document.querySelector('.popup.open');
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}
			curentPopup.classList.add('open');
			curentPopup.addEventListener("click", function (e) {
				if (!e.target.closest('.popup__content')) {
					popupClose(e.target.closest('.popup'));
				}
			});
		}
	}

	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('open');
			if (doUnlock) {
				bodyUnLock();
			}
		}
	}

	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = lockPaddingValue;
			}
		}
		body.style.paddingRight = lockPaddingValue;
		body.classList.add('lock');

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}

	function bodyUnLock() {
		setTimeout(function () {
			if (lockPadding.length > 0) {
				for (let index = 0; index < lockPadding.length; index++) {
					const el = lockPadding[index];
					el.style.paddingRight = '0px';
				}
			}
			body.style.paddingRight = '0px';
			body.classList.remove('lock');
		}, timeout);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}

	document.addEventListener('keydown', function (e) {
		if (e.which === 27) {
			const popupActive = document.querySelector('.popup.open');
			popupClose(popupActive);
		}
	});

	(function () {
		// проверяем поддержку
		if (!Element.prototype.closest) {
			// реализуем
			Element.prototype.closest = function (css) {
				var node = this;
				while (node) {
					if (node.matches(css)) return node;
					else node = node.parentElement;
				}
				return null;
			};
		}
	})();
	(function () {
		// проверяем поддержку
		if (!Element.prototype.matches) {
			// определяем свойство
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector;
		}
	})();

});

var counted = 0;
$(window).scroll(function () {

	var oTop = $('#counter').offset().top - window.innerHeight;
	if (counted == 0 && $(window).scrollTop() > oTop) {
		$('.count').each(function () {
			var $this = $(this),
				countTo = $this.attr('data-stop');
			$({
				countNum: $this.text()
			}).animate({
				countNum: countTo
			},

				{

					duration: 2000,
					easing: 'swing',
					step: function () {
						$this.text(Math.floor(this.countNum));
					},
					complete: function () {
						$this.text(this.countNum);
						//alert('finished');
					}

				});
		});
		counted = 1;
	}

});

