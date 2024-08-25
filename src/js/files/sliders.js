// import Swiper from '../libs/swiper-bundle.min.js';

//<BILD-SWIPER>=================================
let sliders = document.querySelectorAll('._swiper');
if (sliders.length > 0) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			// ветка Слайдов с содержимым mainslider__slide(swiper-slide) и глубже
			let slider_content = slider.innerHTML;
			// let slider_wrapper = element('div', ['swiper-wrapper'], slider_content);
			// создаем пустой див
			let slider_wrapper = document.createElement('div');
			// даем этому диву класс swiper-wrapper
			slider_wrapper.classList.add('swiper-wrapper');
			// помещаем ветку Слайдов внутрь оболочки swiper-wrapper
			slider_wrapper.innerHTML = slider_content;
			// затираем всё что было внутри mainslider__body
			slider.innerHTML = '';
			// в пустой блок mainslider__body вставляем оболочку swiper-wrapper
			slider.appendChild(slider_wrapper);
			// даем клас swiper-bild
			slider.classList.add('swiper-bild');
			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			// slider.data('ligthGallery').destroy(true);
		}
	}
	sliders_bild_callback();
	// }
}
function sliders_bild_callback(params) { }
//</BILD-SWIPER>=================================

// const sliderScrollItems = document.querySelectorAll('._swiper_scroll');
// if (sliderScrollItems.length > 0) {
// 	for (let index = 0; index < sliderScrollItems.length; index++) {
// 		const sliderScrollItem = sliderScrollItems[index];
// 		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
// 		const sliderScroll = new Swiper(sliderScrollItem, {
// 			observer: true,
// 			observeParent: true,
// 			direction: 'vertical',
// 			slidesPerView: 'auto',
// 			freeMode: true,
// 			scrollbar: {
// 				el: sliderScrollBar,
// 				draggable: true,
// 				snapOnRelease: false,
// 			},
// 			mousewheel: {
// 				releaseOnEdges: true,
// 			},
// 		});
// 		sliderScroll.scrollbar.updateSize();
// 	}
// }

//<INIT-SLIDER-1>=================================
//Инициализация и Настройки слайдера 1
if (document.querySelector('.slider-main__body')) {
	let mainSwiper = new Swiper('.slider-main__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 32,
		// autoHeight: true,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preloadImages: false,
		parallax: true,
		// Dotts
		pagination: {
			el: '.controls-slider-main__dotts',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.slider-main .slider-arrow_next',
			prevEl: '.slider-main .slider-arrow_prev',
		},
		// Autoplay
		autoplay: {
			delay: 3000,
			disableOnInteraction: true,
		},
	});
}
//</INIT-SLIDER-1>=================================

//<INIT-SLIDER-2>=================================
//Инициализация и Настройки слайдера 2
if (document.querySelector('.slider-rooms__body')) {
	let roomsSwiper = new Swiper('.slider-rooms__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 'auto',
		spaceBetween: 24,
		// autoHeight: true,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preloadImages: false,
		parallax: true,
		// Dotts
		pagination: {
			el: '.slider-rooms__dotts',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.slider-rooms .slider-arrow_next',
			prevEl: '.slider-rooms .slider-arrow_prev',
		},
		// Autoplay
		autoplay: {
			delay: 4000,
			disableOnInteraction: true,
		},
	});
}
//</INIT-SLIDER-2>=================================

//<INIT-SLIDER-3>=================================
//Инициализация и Настройки слайдера 3
if (document.querySelector('.slider-tips__body')) {
	let tipsSwiper = new Swiper('.slider-tips__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 3,
		spaceBetween: 32,
		// autoHeight: true,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preloadImages: false,
		parallax: true,
		// Dotts
		pagination: {
			el: '.slider-tips__dotts',
			clickable: true,
		},
		// Arrows
		navigation: {
			nextEl: '.slider-tips .slider-arrow_next',
			prevEl: '.slider-tips .slider-arrow_prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1.1,
				spaceBetween: 15,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 32,
			},
		},
		// Autoplay
		autoplay: {
			delay: 3000,
			disableOnInteraction: true,
		},
	});
}
//</INIT-SLIDER-3>=================================

/* //шаблон с Настройками слайдера
if (document.querySelector('.slider-rooms__body')) {
	new Swiper('.slider-rooms__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 'auto',
		spaceBetween: 24,
		watchOverflow: true,
		speed: 800,
		loop: true,
		loopAdditionalSlides: 5,
		preloadImages: false,
		slideToClickedSlide: false,
		touchRatio: 0,
		simulateTouch: false,
		parallax: true,
		effect: 'fade',
		// Autoplay
		autoplay: {
			delay: 3000,
			disableOnInteraction: true,
		},
		// Dots
		pagination: {
			el: '.slider-rooms__dotts',
			clickable: true,
			type: 'fraction',
		},
		// Arrows
		navigation: {
			nextEl: '.slider-rooms .slider-arrow_next',
			prevEl: '.slider-rooms .slider-arrow_prev',
		},
		// ScroLLbar
	scroLLbar: {
		el: '.swiper-scrollbar',
	},
	
				breakpoints: {
					320: {
						slidesPerView: 1,
						spaceBetween: 0,
						autoHeight: true,
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 20,
					},
					992: {
						slidesPerView: 3,
						spaceBetween: 20,
					},
					1268: {
						slidesPerView: 4,
						spaceBetween: 30,
					},
				},
		})
}
*/