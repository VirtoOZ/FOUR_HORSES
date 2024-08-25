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
import { isMobile } from "./functions.js";
//</isMobile>=================================

window.onload = function () { //когда весь контент загрузится
	document.addEventListener("click", documentActions);

	// Actions (делигирование события click)
	function documentActions(e) {
		const targetElement = e.target; // кладем в переменную нажатый объект
		if (window.innerWidth > 768 && isMobile.any()) { // если ширина окна меньше 768 и это мобилка
			// hover для мобилки
			if (targetElement.classList.contains('menu__arrow')) {
				targetElement.closest('.menu__item').classList.toggle('_hover');
			}
			if (!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._hover').length > 0) {
				_removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover');
			}
		}
		// поиск в шапке, добавляем класс _active для кнопки поиска
		if (targetElement.classList.contains('search-form__icon')) {
			document.querySelector('.search-form').classList.toggle('_active');
		} else if (!targetElement.closest('.search-form') && document.querySelector('.search-form._active')) {
			document.querySelector('.search-form').classList.remove('_active');
		}
		// подгрузка товаров из JSON, отлавливаем нажатие на кнопку more
		if (targetElement.classList.contains('products__more')) {
			getProducts(targetElement);
			e.preventDefault();
		}
		// добавление товаров в корзину, ловим нажатие на кнопке Add to card
		if (targetElement.classList.contains('actions-product__button')) {
			const productId = targetElement.closest('.item-product').dataset.pid; // кладем в переменную нажатый объект
			addToCard(targetElement, productId);
			e.preventDefault();
		}
		// При нажатии на значек корзины в шапке открываем .cart-header
		if (targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
			if (document.querySelector('.cart-list').children.length > 0) {
				document.querySelector('.cart-header').classList.toggle('_active');
			}
			e.preventDefault();//при клике на другое место, закрываем окно c товарами
		} else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('actions-product__button')) {
			document.querySelector('.cart-header').classList.remove('_active');
		}
		// функция удаления из корзины
		if (targetElement.classList.contains('cart-list__delete')) {
			const productId = targetElement.closest('.cart-list__item').dataset.cartPid; // кладем в переменную нажатый объект
			updateCart(targetElement, productId, false);//false говорит о том что не добавляем, а удаляем объект
			e.preventDefault();
		}
	}
	//=================================
	// работа c шабкой при скролле
	let headerElement = document.querySelector('.header');
	const callback = function (entries, observer) {
		if (entries[0].isIntersecting) {
			headerElement.classList.remove('_scroll');
		} else {
			headerElement.classList.add('_scroll');
		}
	};
	const headerObserver = new IntersectionObserver(callback);
	headerObserver.observe(headerElement);
	//=================================
	//Load More Products функция получения товаров из JSON
	async function getProducts(button) {
		if (!button.classList.contains('_hold')) {
			button.classList.add('_hold');
			const file = "json/products.json";
			let response = await fetch(file, {
				method: "GET"
			});
			if (response.ok) {
				let result = await response.json();
				loadProducts(result);
				button.classList.remove('_hold');
				button.remove();
			} else {
				alert("Ошибка");
			}
		}
	}
	//=================================
	//сборка шаблона товаров полученных из JSON
	function loadProducts(data) {
		const productsItems = document.querySelector('.products__items');

		data.products.forEach(item => {
			const productId = item.id;
			const productUrl = item.url;
			const productImage = item.image;
			const productTitle = item.title;
			const productText = item.text;
			const productPrice = item.price;
			const productOldPrice = item.priceold;
			const productShareUrl = item.shareUrl;
			const productLikeUrl = item.likeUrl;
			const productLabels = item.labels;

			//=================================
			let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
			let productTemplateEnd = `</article>`;

			let productTemplateLabels = '';
			if (productLabels) {
				let productTemplateLabelsStart = `<div class="item-product__labels">`;
				let productTemplateLabelsEnd = `</div>`;
				let productTemplateLabelsContent = '';

				productLabels.forEach(labelItem => {
					productTemplateLabelsContent += `<div class="item-product__label item-product__label_${labelItem.type}">${labelItem.value}</div>`;
				});

				productTemplateLabels += productTemplateLabelsStart;
				productTemplateLabels += productTemplateLabelsContent;
				productTemplateLabels += productTemplateLabelsEnd;
			}

			let productTemplateImage = `
		<a href="${productUrl}" class="item-product__image _ibg">
			<img src="img/products/${productImage}" alt="${productTitle}">
		</a>
	`;

			let productTemplateBodyStart = `<div class="item-product__body">`;
			let productTemplateBodyEnd = `</div>`;

			let productTemplateContent = `
		<div class="item-product__content">
			<h3 class="item-product__title">${productTitle}</h3>
			<div class="item-product__text">${productText}</div>
		</div>
	`;

			let productTemplatePrices = '';
			let productTemplatePricesStart = `<div class="item-product__prices">`;
			let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
			let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
			let productTemplatePricesEnd = `</div>`;

			productTemplatePrices = productTemplatePricesStart;
			productTemplatePrices += productTemplatePricesCurrent;
			if (productOldPrice) {
				productTemplatePrices += productTemplatePricesOld;
			}
			productTemplatePrices += productTemplatePricesEnd;

			let productTemplateActions = `
		<div class="item-product__actions actions-product">
			<div class="actions-product__body">
				<a href="" class="actions-product__button btn btn_white">Add to cart</a>
				<a href="${productShareUrl}" class="actions-product__link _icon-share">Share</a>
				<a href="${productLikeUrl}" class="actions-product__link _icon-favorite">Like</a>
			</div>
		</div>
	`;

			let productTemplateBody = '';
			productTemplateBody += productTemplateBodyStart;
			productTemplateBody += productTemplateContent;
			productTemplateBody += productTemplatePrices;
			productTemplateBody += productTemplateActions;
			productTemplateBody += productTemplateBodyEnd;

			let productTemplate = '';
			productTemplate += productTemplateStart;
			productTemplate += productTemplateLabels;
			productTemplate += productTemplateImage;
			productTemplate += productTemplateBody;
			productTemplate += productTemplateEnd;
			//=================================
			productsItems.insertAdjacentHTML('beforeend', productTemplate);
		});
	}
	//=================================
	// Добавление товаров в корзину
	function addToCard(productButton, productId) {
		if (!productButton.classList.contains('_hold')) {//если у кнопки нет класса _hold
			productButton.classList.add('_hold');
			productButton.classList.add('_fly');
			let cart = document.querySelector('.cart-header__icon');
			let product = document.querySelector(`[data-pid="${productId}"]`);
			let productImage = product.querySelector('.item-product__image');


			// для эффекта летящего товара в корзину нужно сделать клон картинки
			let productImageFly = productImage.cloneNode(true);

			let productImageFlyWidth = productImage.offsetWidth;//ширина оригинальной картинки
			let productImageFlyHeight = productImage.offsetHeight;//высота
			let productImageFlyTop = productImage.getBoundingClientRect().top;//позицию сверху
			let productImageFlyLeft = productImage.getBoundingClientRect().left;//позицию слева

			// применяем полученные размеры и позиции я для клона
			productImageFly.setAttribute('class', '_flyImage _ibg');//меняем класс на fly и ibg
			productImageFly.style.cssText =
				`
				width:${productImageFlyWidth}px;
				height: ${productImageFlyHeight}px;
				top: ${productImageFlyTop}px;
				left: ${productImageFlyLeft}px;
			`;
			document.body.append(productImageFly);//вставляем копию картинки в конец body

			let cartFlyTop = cart.getBoundingClientRect().top;//ширина оригинальной картинки
			let cartFlyLeft = cart.getBoundingClientRect().left;//ширина оригинальной картинки

			// по мере полета картинки будут изменяться параметры
			productImageFly.style.cssText =
				`
				width: 0px;
				height: 0px;
				top: ${cartFlyTop}px;
				left: ${cartFlyLeft}px;
				opacity: 0;
			`;
			// вывод на значке корзины колличества товаров нужно после того, 
			// когда товар до нее долетит
			productImageFly.addEventListener('transitionend', function () {
				if (productButton.classList.contains('_fly')) {
					productImageFly.remove();
					updateCart(productButton, productId);
					productButton.classList.remove('_fly');
				}
			});
		}

	}
	//=================================
	// обновление корзины. Добавляет и удаляет товары
	function updateCart(productButton, productId, productAdd = true) {
		let cart = document.querySelector('.cart-header');
		let cartIcon = cart.querySelector('.cart-header__icon');
		let cartQuantity = cartIcon.querySelector('span');
		let cartPropduct = document.querySelector(`[data-cart-pid="${productId}"]`);
		let cartList = document.querySelector('.cart-list');

		// Добавляем товары
		if (productAdd) {
			if (cartQuantity) {
				cartQuantity.innerHTML = ++cartQuantity.innerHTML;
			} else {
				cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
			}
			if (!cartPropduct) {
				let propduct = document.querySelector(`[data-pid="${productId}"]`);
				let cartPropductImage = propduct.querySelector('.item-product__image').innerHTML;
				let cartPropductTitle = propduct.querySelector('.item-product__title').innerHTML;
				let cartPropductContent = `
				<a href="" class="cart-list__image _ibg">${cartPropductImage}</a>
				<div calss="cart-list__body">
					<a href="" class="cart-list__title">${cartPropductTitle}</a>
					<div class="cart-list__quantity">Quantity: <span>1</span></div>
					<a href="" class="cart-list__delete">Delete</a>
				</div>`;
				cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${productId}" class="cart-list__item">${cartPropductContent}</li>`);
			} else {
				let cartPropductQuantity = cartPropduct.querySelector('.cart-list__quantity span');
				cartPropductQuantity.innerHTML = ++cartPropductQuantity.innerHTML;
			}

			// после всех действий удаляем блокировку _hold c кнопки добавления, 
			// чтобы разрешить добавить этот же товар ещё раз
			productButton.classList.remove('_hold');
		} else {
			// удаление товара из корзины
			const cartProductQuantity = cartPropduct.querySelector('.cart-list__quantity span');
			cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
			if (!parseInt(cartProductQuantity.innerHTML)) {
				cartPropduct.remove();
			}
			const cartQuantityValue = --cartQuantity.innerHTML;

			if (cartQuantityValue) {
				cartQuantity.innerHTML = cartQuantityValue;
			} else {
				cartQuantity.remove();
				cart.classList.remove('_active');
			}
		}
		//=================================
	}
}
//=================================
function _removeClasses(object, classToRemove) {
	for (let index = 0; index < object.length; index++) {
		const element = object[index];
		element.classList.remove(classToRemove);
	}
}
//=================================

//GALLERY=================================
// При нахождении курсора на галерее и смещении относительно центра,
// галерея будет двигаться навстречу курсору
let furniture = document.querySelector('.furniture__body');
if (furniture && !isMobile.any()) {
	const furnitureItems = document.querySelector('.furniture__items');
	const furnitureColumn = document.querySelectorAll('.furniture__column');
	// скорость анимации
	const speed = furniture.dataset.speed;

	let positionX = 0;
	let coordXprocent = 0;

	function setMouseGalleryStyle() {
		let furnitureItemsWidth = 0;
		// перебор колонок
		furnitureColumn.forEach(element => {
			// и выщитываем общюю ширину всех колонок
			furnitureItemsWidth += element.offsetWidth;
		});

		// получаем разницу ширин всего контента и видимой части
		const furnitureDifferent = furnitureItemsWidth - furniture.offsetWidth;

		// смещение положения курсора
		const distX = Math.floor(coordXprocent - positionX);
		// учитываем скорость 
		positionX = positionX + (distX * speed);
		// позиция относительно разницы ширин
		let position = furnitureDifferent / 200 * positionX;

		// обращаемся к объекту который будем двигать
		furnitureItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;

		// запуск функции передавая ее в requestAnimationFrame
		// функция работает только тогда, когда нам есть что двигать
		if (Math.abs(distX) > 0) {
			requestAnimationFrame(setMouseGalleryStyle);
		} else {
			furniture.classList.remove('_init');
		}
	}
	furniture.addEventListener("mousemove", function (e) {
		// получение видимой ширины
		const furnitureWidth = furniture.offsetWidth;

		// вычисляем ноль когда курсор по середине
		const coordX = e.pageX - furnitureWidth / 2;

		//Когда курсор в середине это 0 а когда в конце это 100% получаем проценты
		coordXprocent = coordX / furnitureWidth * 200;

		// запускаем анимацию только тогда когда у боди нет класса _init
		if (!furniture.classList.contains('_init')) {
			requestAnimationFrame(setMouseGalleryStyle);
			furniture.classList.add('_init');
		}
	})
}
//=================================
//<BURGER>=================================
const iconMenu = document.querySelector('.icon-menu');//находим класс icon-menu
const menuBody = document.querySelector('.menu__body');//находим класс menu__body
const headerBody = document.querySelector('.header__body');//находим класс menu__body
if (iconMenu) {//Проверяем есть ли icon-menu
	iconMenu.addEventListener("click", function (e) {//вещам событие при клике мыши
		document.body.classList.toggle('_lock');//Для Body даем класс Lock для отключения прокрутки
		iconMenu.classList.toggle('_active');//добавляем класс active icon-menu
		menuBody.classList.toggle('_active');//добавляем класс active menu__body
		headerBody.classList.toggle('_active');//добавляем класс active menu__body
		// _slideToggle(menuBody, 500);
	});
};
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
