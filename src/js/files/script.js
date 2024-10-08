import { ibg } from "./functions.js";
//когда весь контент загрузится
window.onload = function () {
	ibg();
	let width, addCoef, allSlide, slider_2_Length, resizeWidth, calcWidth, addClone;
	document.addEventListener("click", documentActions);
	// Actions (делигирование события click)
	function documentActions(e) {
		const targetElement = e.target; // кладем в переменную нажатый объект
		/* 		if (window.innerWidth > 768 && isMobile.any()) { // если ширина окна меньше 768 и это мобилка
				hover для мобилки
				if (targetElement.classList.contains('menu__arrow')) {
					targetElement.closest('.menu__item').classList.toggle('_hover');
				}
				if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
					_removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover');
				}
				} */
		if (targetElement.classList.contains('controls-stages__arrow-right')) {
			nextSlide(slider_1_Count, slider_1_Length, slider_1_Length, slider_1, slider_1_Line);
		}
		if (targetElement.classList.contains('controls-stages__arrow-left')) {
			prevSlide(slider_1_Count, slider_1_Length, slider_1_Length, slider_1, slider_1_Line);
		}
		if (targetElement.classList.contains('controls-participants__arrow-right')) {
			nextSlide(currentSlide, allSlide, slider_2_Length, slider_2, slider_2_Line);
		}
		if (targetElement.classList.contains('controls-participants__arrow-left')) {
			prevSlide(currentSlide, allSlide, slider_2_Length, slider_2, slider_2_Line);
		}
		/* поиск в шапке, добавляем класс _active для кнопки поиска
		if (targetElement.classList.contains('search-form__icon')) {
			document.querySelector('.search-form').classList.toggle('_active');
		} else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
			document.querySelector('.search-form').classList.remove('_active');
		}
		подгрузка товаров из JSON, отлавливаем нажатие на кнопку more
		if (targetElement.classList.contains('products__more')) {
			getProducts(targetElement);
			e.preventDefault();
		}
		добавление товаров в корзину, ловим нажатие на кнопке Add to card
		if (targetElement.classList.contains('actions-product__button')) {
			const productId = targetElement.closest('.item-product').dataset.pid; // кладем в переменную нажатый объект
			addToCard(targetElement, productId);
			e.preventDefault();
		}
		При нажатии на значек корзины в шапке открываем .cart-header
		if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
			if (document.querySelector('.cart-list').children.length > 0) {
				document.querySelector('.cart-header').classList.toggle('_active');
			}
			e.preventDefault();//при клике на другое место, закрываем окно c товарами
		} else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
			document.querySelector('.cart-header').classList.remove('_active');
		}
		функция удаления из корзины
		if (targetElement.classList.contains('cart-list__delete')) {
			const productId = targetElement.closest('.cart-list__item').dataset.cartPid; // кладем в переменную нажатый объект
			updateCart(targetElement, productId, false);//false говорит о том что не добавляем, а удаляем объект
			e.preventDefault();
		} */
	}
	//=================================

	//<SLIDER-STAGE>=================================
	let slider_1 = document.querySelector('.stages__slider');
	let slider_1_Line = document.querySelector('.stages__items');
	let slider_1_Item = slider_1_Line.children;
	let slider_1_Count = 0;
	let slider_1_Length = slider_1_Item.length;
	let slider_1_PaginationWrapper = document.querySelector('.controls-stages__pagination');
	let slider_1_ButtonNext = document.querySelector('.controls-stages__arrow-right');
	let slider_1_ButtonPrev = document.querySelector('.controls-stages__arrow-left');
	// Создаем точки по колличеству карточек
	function buildBullets() {
		if (slider_1_Length > 0) {
			for (let index = 0; index < slider_1_Length; index++) {
				slider_1_PaginationWrapper[index] = slider_1_PaginationWrapper.insertAdjacentHTML('beforeend', '<div class="controls-stages__dott"></div>');
			}
		}
		return;
	}
	buildBullets();
	// Делаем активной текущую точку
	function activeBullet(current) {
		let paginationDotts = document.querySelectorAll('.controls-stages__dott');
		for (let index = 0; index < paginationDotts.length; index++) {
			const paginationDott = paginationDotts[index];
			paginationDott.classList.remove('_active');
			if (index == current) {
				paginationDott.classList.add('_active');
			}
		}
	}
	activeBullet(slider_1_Count);
	//</SLIDER-STAGE>=================================

	//<SLIDER-PARTICIPANTS>=================================
	let slider_2 = document.querySelector('.participants__body');
	let slider_2_Line = document.querySelector('.participants__row');
	let slider_2_Item = document.querySelectorAll('.participants__column');
	slider_2_Length = slider_2_Item.length;
	let slider_2_PaginationCurrent = document.querySelector('.controls-participants__pagination-current');
	let slider_2_paginationTotal = document.querySelector('.controls-participants__pagination-total>span');
	let slider_2_ButtonNext = document.querySelector('.controls-participants__arrow-right');
	let slider_2_ButtonPrev = document.querySelector('.controls-participants__arrow-left');
	// Режим работы слайдера
	function getSliderMod() {
		width < 640 ? addCoef = 1 :
			width > 640 && width < 991 ? addCoef = 2 :
				width > 992 ? addCoef = 3 : '';
	}
	// Получаем количество страниц если режим 2 или 3 слайда на страницу
	function getSlidesLength() {
		allSlide = Math.ceil(slider_2_Length / addCoef);
	}
	getSlidesLength();
	let currentSlide = 0;
	// Функция состояния стрелок
	function arrowStatus(slider, current, lenght) {
		if (current == 0) {
			slider_1_ButtonNext.classList.add('arrow-right_black');
			slider_1_ButtonPrev.classList.remove('arrow-left_black');
		}
		if (current > 0 && current < lenght) {
			slider_1_ButtonPrev.classList.add('arrow-left_black');
			slider_1_ButtonNext.classList.add('arrow-right_black');
		}
		if (slider == slider_1 && current == lenght - 1) {
			slider_1_ButtonNext.classList.remove('arrow-right_black');
		}
		if (slider == slider_1 && lenght == 1) {
			slider_1_ButtonNext.classList.remove('arrow-right_black');
			slider_1_ButtonPrev.classList.remove('arrow-left_black');
		}
		if (slider == slider_2 && lenght == 1) {
			slider_2_ButtonNext.classList.remove('arrow-right_black');
			slider_2_ButtonPrev.classList.remove('arrow-left_black');
		}
	}
	if (slider_1) {
		arrowStatus(slider_1, slider_1_Count, slider_1_Length);
	}
	if (slider_2) {
		arrowStatus(slider_2, currentSlide, allSlide);
	}
	// Функция расчёта пагинации
	function partPagination(current, all, length, slider) {
		if (slider == slider_2) {
			slider_2_paginationTotal.innerHTML = length;
			if (all > 1 && current < all - 1) {
				slider_2_PaginationCurrent.innerHTML = current * addCoef + addCoef;
			}
			if (current == all - 1) {
				slider_2_PaginationCurrent.innerHTML = length;
			}
		}
	}
	partPagination(currentSlide, allSlide, slider_2_Length, slider_2);
	// Функция слайдер вперед
	function nextSlide(current, all, length, slide, line) {
		if (current >= 0 && current < all) {
			current++;
			partPagination(current, all, length, slide);
		}
		if (current == all) {
			current++;
			partPagination(current, all, length, slide);
			if (slide == slider_1) {
				current = all - 1;
			}
		}
		if (current > all) {
			current = 0;
			partPagination(current, all, length, slide);
		}
		moveSlider(current, slide, line);
	}
	// Функция Слайдер назад
	function prevSlide(current, all, length, slide, line) {
		if (current >= 0 && current <= all) {
			if (slide == slider_1 && current == 0) {
				current = 1;
			}
			current--;
			if (current <= -1) {
				current = all - 1;
				slider_2_PaginationCurrent.innerHTML = length;
			} else partPagination(current, all, length, slide);
		}
		moveSlider(current, slide, line);
	}
	// Функция движения слайда
	function moveSlider(current, slide, line) {
		let sliderWidth = slide.offsetWidth + 20;
		line.style.transform = `translate3d(${-current * sliderWidth}px, 0, 0)`;
		slide == slider_2 ? currentSlide = current : slide == slider_1 ? slider_1_Count = current : '';
		if (slide == slider_2) {
			currentSlide = current;
		}
		if (slide == slider_1) {
			slider_1_Count = current;
			activeBullet(slider_1_Count);
			arrowStatus(slider_1, current, slider_1_Length);
		}
	}
	// Автопрокрутка слайдов
	setInterval(() => {
		nextSlide(currentSlide, allSlide, slider_2_Length, slider_2, slider_2_Line);
	}, 4000);
	//</SLIDER-PARTICIPANTS>=================================

	//<PARALAX>=================================
	const parallax = document.querySelector('.main');
	if (parallax) {
		const content = document.querySelector('.main-content');
		const sun = document.querySelector('.main-wrapper__sun');
		const city = document.querySelector('.main-wrapper__city');
		const chessBehind = document.querySelector('.main-wrapper__chess-behind');
		const chessFront = document.querySelector('.main-wrapper__chess-front');
		//-Коэффициенты
		const forSun = 3;
		const forCity = 50;
		const forChessBehind = 20;
		const forChessFront = 50;
		// Скорость анимации
		const speed = 0.05;
		// Объявление переменных
		let positionX = 0, positionY = 0;
		let coordXprocent = 0, coordYprocent = 0;
		function setMouseParallaxStyle() {
			const distX = coordXprocent - positionX;
			const distY = coordYprocent - positionY;

			positionX = positionX + (distX * speed);
			positionY = positionY + (distY * speed);

			// Передаем стили
			sun.style.cssText = `transform: translate(${positionX / forSun}%,${positionY / forSun}%);`;
			city.style.cssText += `transform: translate(${positionX / forCity}%,${positionY / forCity}%);`;
			chessBehind.style.cssText += `transform: translate(${positionX / forChessBehind}%,${positionY / forChessBehind}%);`;
			chessFront.style.cssText += `transform: translate(${positionX / forChessFront}%,${positionY / forChessFront}%);`;

			requestAnimationFrame(setMouseParallaxStyle);
			// console.log(chessBehind.style.cssText = `transform: translate(${positionX / forChessBehind}%,${positionY / forChessBehind}%);`);

		}
		setMouseParallaxStyle();

		parallax.addEventListener("mousemove", function (e) {
			// Получение -ширины и высоты блока
			const parallaxWidth = parallax.offsetWidth;
			const parallaxHeight = parallax.offsetHeight;

			// Ноль по середине
			const coordX = e.pageX - parallaxWidth / 2;
			const coordY = e.pageY - parallaxHeight / 2;

			// Получаем проценты
			coordXprocent = coordX / parallaxWidth * 100;
			coordYprocent = coordY / parallaxHeight * 100;
		});
		// ParalLax при скролле

		/* 		let thresholdSets = [];
				for (let i = 0; i <= 1.0; i += 0.005) {
					thresholdSets.push(i);
				} */
		/* const callback = function (entries, observer) {
			const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
			setParallaxItemsStyle(scrollTopProcent);
		}; */
		/* const observer = new IntersectionObserver(callback, {
			threshold: thresholdSets
		}); */

		// observer.observe(document.querySelector('.visit'));

		/* function setParallaxItemsStyle(scrollTopProcent) {
			content.style.cssText = `transform: translate(0%,-${scrollTopProcent / 9}%);`;
			city.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 6}%);`;
			chessBehind.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 3}%);`;
			chessFront.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 1.5}%);`;
		} */
	}
	//</PARALAX>=================================

	//<SCROLL-ANIMATION>=================================
	const animItems = document.querySelectorAll('._anim-items');
	if (animItems.length > 0) {
		window.addEventListener('scroll', animOnScroll);
		function animOnScroll() {
			for (let index = 0; index < animItems.length; index++) {
				const animItem = animItems[index];
				const animItemHeight = animItem.offsetHeight;
				const animItemOffset = offset(animItem).top;
				const animStart = 4;

				let animItemPoint = window.innerHeight - animItemHeight / animStart;
				if (animItemHeight > window.innerHeight) {
					animItemPoint = window.innerHeight - window.innerHeight / animStart;
				}
				if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
					animItem.classList.add('_active');
				} else {
					if (!animItem.classList.contains('_anim-no-hide')) {
						animItem.classList.remove('_active');
					}
				}
			}
		}
		function offset(el) {
			const rect = el.getBoundingClientRect(),
				scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
				scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
		}
		setTimeout(() => {
			animOnScroll();
		}, 300);
	}
	//</SCROLL-ANIMATION>=================================

	//<RUNNING-STRING>=================================
	const runningLines = document.querySelectorAll('.running-line');
	if (runningLines.length > 0) {
		for (let index = 0; index < runningLines.length; index++) {
			let runningLine = runningLines[index];
			let itemWidth = 0, itemsWidth = 0;
			let strBody = runningLine.firstElementChild;
			let strItemsP = strBody.children;
			let cloneStrP;
			// получаем конкретный элемент P
			for (let index = 0; index < strItemsP.length; index++) {
				let strItemP = strItemsP[index];
				// Подсчёт ширины
				calcWidth = function () {
					width = document.documentElement.clientWidth;
					itemWidth = strItemP.clientWidth;
				};
				// Добавление клона P если ширина недостаточная
				addClone = function () {
					for (let index = 0; itemsWidth <= width; index++) {
						cloneStrP = strItemP.cloneNode(true);
						strBody.insertAdjacentElement('beforeend', cloneStrP);
						itemsWidth += itemWidth;
					}
				};
				resizeWidth = function () {
					calcWidth();
					addClone();
					calcWidth();
					getSliderMod();
					getSlidesLength();
				};
				resizeWidth();
				let progress = 1;
				let speed = 2;
				// Запуск анимации движения
				function runStr() {
					// width = document.documentElement.clientWidth;
					// itemWidth = strItemP.clientWidth;
					progress -= speed;
					if (progress <= itemWidth * -1) { progress = 0; }
					strBody.style.transform = 'translate3d(' + (progress) + 'px, 0, 0)';
					window.requestAnimationFrame(runStr);
				}
				runStr();
			}
		}
	}
	// Ловим событие измения экрана и делаем пересчёт
	window.addEventListener('resize', resizeWidth);
	//</RUNNING-STRING>=================================
}