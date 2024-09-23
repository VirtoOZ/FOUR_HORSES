//<ANIM-SLIDE>=================================
/*   Анимированное плавное открытие и закрытие блока.
Может применяться к меню или выпадающему списку
Выписано из видео фрилансера.
В CSS нужно установить display: none; для родителя.
*/
// SlideUP
// import { _slideUp } from "forms.js";
// SlideDown
// import { _slideDown } from "forms.js";
//SlideToggLe
// import { _slideToggle } from "forms.js";
//</ANIM-SLIDE>=================================
//<isMobile>=================================
//Проверка на каком устройстве работаем
// import { isMobile } from "./functions.js";
//</isMobile>=================================

window.onload = function () { //когда весь контент загрузится
	document.addEventListener("click", documentActions);

	// Actions (делигирование события click)
	function documentActions(e) {
		const targetElement = e.target; // кладем в переменную нажатый объект
		// if (window.innerWidth > 768 && isMobile.any()) { // если ширина окна меньше 768 и это мобилка
		// hover для мобилки
		// if (targetElement.classList.contains('menu__arrow')) {
		// 	targetElement.closest('.menu__item').classList.toggle('_hover');
		// }
		// if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
		// 	_removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover');
		// }
		// }
		if (targetElement.classList.contains('arrow-right')) {
			nextSlide();
		}
		if (targetElement.classList.contains('arrow-left')) {
			prevSlide();
		}
		if (targetElement.classList.contains('controls__arrow_right')) {
			nextPartSlide();
		}
		if (targetElement.classList.contains('controls__arrow_left')) {
			prevPartSlide();
		}
		// поиск в шапке, добавляем класс _active для кнопки поиска
		// if (targetElement.classList.contains('search-form__icon')) {
		// 	document.querySelector('.search-form').classList.toggle('_active');
		// } else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
		// 	document.querySelector('.search-form').classList.remove('_active');
		// }
		// подгрузка товаров из JSON, отлавливаем нажатие на кнопку more
		// if (targetElement.classList.contains('products__more')) {
		// 	getProducts(targetElement);
		// 	e.preventDefault();
		// }
		// добавление товаров в корзину, ловим нажатие на кнопке Add to card
		// if (targetElement.classList.contains('actions-product__button')) {
		// 	const productId = targetElement.closest('.item-product').dataset.pid; // кладем в переменную нажатый объект
		// 	addToCard(targetElement, productId);
		// 	e.preventDefault();
		// }
		// При нажатии на значек корзины в шапке открываем .cart-header
		// if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
		// 	if (document.querySelector('.cart-list').children.length > 0) {
		// 		document.querySelector('.cart-header').classList.toggle('_active');
		// 	}
		// 	e.preventDefault();//при клике на другое место, закрываем окно c товарами
		// } else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
		// 	document.querySelector('.cart-header').classList.remove('_active');
		// }
		// функция удаления из корзины
		// if (targetElement.classList.contains('cart-list__delete')) {
		// 	const productId = targetElement.closest('.cart-list__item').dataset.cartPid; // кладем в переменную нажатый объект
		// 	updateCart(targetElement, productId, false);//false говорит о том что не добавляем, а удаляем объект
		// 	e.preventDefault();
		// }
	}
	//=================================
	// работа c шабкой при скролле
	// let headerElement = document.querySelector('.header');
	// const callback = function (entries, observer) {
	// 	if (entries[0].isIntersecting) {
	// 		headerElement.classList.remove('_scroll');
	// 	} else {
	// 		headerElement.classList.add('_scroll');
	// 	}
	// };
	// const headerObserver = new IntersectionObserver(callback);
	// headerObserver.observe(headerElement);
	//<SLIDER-STAGE>=================================
	let slider = document.querySelector('.stages__slider');
	let sliderLine = document.querySelector('.stages__items');
	let sliderItem = sliderLine.children;
	let sliderCount = 0;
	let sliderLength = sliderItem.length;
	let paginationWrapper = document.querySelector('.controls__pagination');

	function buildBullets() {
		if (sliderLength > 0) {
			for (let index = 0; index < sliderLength; index++) {
				paginationWrapper[index] = paginationWrapper.insertAdjacentHTML('beforeend', '<div class="controls__dott"></div>');
			}
		}
		return;
	}
	buildBullets();
	function activeBullet() {
		let paginationDotts = document.querySelectorAll('.controls__dott');
		for (let index = 0; index < paginationDotts.length; index++) {
			const paginationDott = paginationDotts[index];
			paginationDott.classList.remove('_active');
			if (index == sliderCount) {
				paginationDott.classList.add('_active');
			}
		}
	}
	activeBullet();
	if (slider) {
		arrowStatus();
	}
	// Функция Слайдер вперед
	function nextSlide() {
		if (sliderCount >= 0 && sliderCount < [sliderItem.length] - 1) {
			sliderCount++;
		} else {
			return;
		}
		moveSlider();
		arrowStatus();
		activeBullet();
	}
	// Функция Слайдер назад
	function prevSlide() {
		if (sliderCount >= 1 && sliderCount < sliderItem.length) {
			sliderCount--;
			if (sliderCount < 0) {
				sliderCount = 0;
			}
			moveSlider();
			arrowStatus();
			activeBullet();
		}
	}
	// Функция состояния стрелок
	function arrowStatus() {
		let buttonNext = document.querySelector('.arrow-right');
		let buttonPrev = document.querySelector('.arrow-left');
		if (sliderCount == 0) {
			buttonNext.classList.add('arrow-right_black');
			buttonNext.classList.remove('arrow-right_disabled');
			buttonPrev.classList.remove('arrow-left_black');
			buttonPrev.classList.add('arrow-left_disabled');
		}
		if (sliderCount > 0 && sliderCount <= sliderItem.length) {
			buttonPrev.classList.remove('arrow-left_disabled');
			buttonPrev.classList.add('arrow-left_black');
			buttonNext.classList.remove('arrow-right_disabled');
			buttonNext.classList.add('arrow-right_black');
		}
		if (sliderCount == [sliderItem.length] - 1) {
			buttonNext.classList.remove('arrow-right_black');
			buttonNext.classList.add('arrow-right_disabled');
		}
	}
	// Функция движение слайда
	function moveSlider() {
		let sliderWidth = slider.offsetWidth;
		sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
	}

	//</SLIDER-STAGE>=================================

	//<SLIDER-PARTICIPANTS>=================================
	let sliderPart = document.querySelector('.participants__body');
	let sliderPartLine = document.querySelector('.participants__row');
	let sliderPartItem = document.querySelectorAll('.participants__column');
	let sliderPartLength = sliderPartItem.length;
	let paginationCurrent = document.querySelector('.controls__pagination-current');
	let paginationTotal = document.querySelector('.controls__pagination-total>span');
	let addCoef = 0;
	addCoef = window.innerWidth < 640 ? addCoef = 1 :
		window.innerWidth > 640 && window.innerWidth < 991 ? addCoef = 2 :
			window.innerWidth > 992 ? addCoef = 3 : '';
	let sliderPartCount = 1 * addCoef;

	function buildPartPagination() {
		if (sliderPartLength > 1) {
			paginationTotal.innerHTML = sliderPartLength;
			paginationCurrent.innerHTML = sliderPartCount;
		}
		return;
	}
	buildPartPagination();
	// Функция Слайдер вперед
	function nextPartSlide() {
		if (sliderPartCount <= sliderPartLength && sliderPartCount >= 1) {
			sliderPartCount += addCoef;
			if (sliderPartCount < sliderPartLength) {
				paginationCurrent.innerHTML = sliderPartCount;
			} else {
				paginationCurrent.innerHTML = sliderPartLength;
			}
		} else
			if (sliderPartCount > sliderPartLength) {
				sliderPartCount = addCoef;
				paginationCurrent.innerHTML = sliderPartCount;
			}
		moveSliderPart();
	}
	// Функция Слайдер назад
	function prevPartSlide() {
		if (sliderPartCount <= sliderPartLength) {
			// console.log(sliderPartCount);
			sliderPartCount -= addCoef;
			// console.log(sliderPartCount);
			// paginationCurrent.innerHTML = sliderPartCount;
		}
		if (sliderPartCount < addCoef) {
			// sliderPartCount = sliderPartLength - 1;
			sliderPartCount = sliderPartLength / addCoef;
			// console.log(sliderPartCount);
			paginationCurrent.innerHTML = sliderPartLength;
		}
		moveSliderPart();
	}
	// Функция движение слайда
	function moveSliderPart() {
		console.log(sliderPartCount);

		let sliderWidth = sliderPart.offsetWidth + 20;
		sliderPartLine.style.transform = `translateX(${-((sliderPartCount - addCoef) / addCoef) * sliderWidth}px)`;
	}
	// Автопрокрутка слайдов
	// setInterval(() => {
	// 	nextPartSlide();
	// }, 4000);
	//</SLIDER-PARTICIPANTS>=================================

	//=================================

	//=================================
	// обновление корзины. Добавляет и удаляет товары

}
//=================================
// function _removeClasses(object, classToRemove) {
// 	for (let index = 0; index < object.length; index++) {
// 		const element = object[index];
// 		element.classList.remove(classToRemove);
// 	}
// }
//=================================
//<BURGER>=================================
// const iconMenu = document.querySelector('.icon-menu');//находим класс icon-menu
// const menuBody = document.querySelector('.menu__body');//находим класс menu__body
// const headerBody = document.querySelector('.header__body');//находим класс menu__body
// if (iconMenu) {//Проверяем есть ли icon-menu
// 	iconMenu.addEventListener("click", function (e) {//вещам событие при клике мыши
// 		document.body.classList.toggle('_lock');//Для Body даем класс Lock для отключения прокрутки
// 		iconMenu.classList.toggle('_active');//добавляем класс active icon-menu
// 		menuBody.classList.toggle('_active');//добавляем класс active menu__body
// 		headerBody.classList.toggle('_active');//добавляем класс active menu__body
// 		// _slideToggle(menuBody, 500);
// 	});
// };
//</BURGER>=================================

//<BURGER SIDE-MENU>=================================
// let menuPageBurger = document.querySelector('.menu-page__burger');
// let menuPageBody = document.querySelector('.menu-page__body');
// menuPageBurger.addEventListener("click", function (e) {
// 	// menuPageBody.classList.toggle('_active');
// 	menuPageBurger.classList.toggle('_active');
// 	_slideToggle(menuPageBody, 500);
// });
//</BURGER SIDE-MENU>=================================
