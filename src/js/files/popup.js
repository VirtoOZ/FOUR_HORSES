//<POPUP>=================================
//получаем все эл popup-link
const popupLinks = document.querySelectorAll('.popup-link');
//получаем тег боди для лока
const body = document.querySelector('body');
/*для избавления эффекта смещения контента когда появляется полоса
прокруткиДобавляем этот клас для всех фиксированых объектов*/
const lockPadding = document.querySelectorAll('._lock-padding');
//для предотвращения двойных нажатий
let unlock = true;
//связано с блокировкой скрола и равна transition
const timeout = 800;

//=================================
export function topopUp(str) {
	let popup_name = 'popup_' + str;
	// console.log(popup_name);

	const popUps = document.querySelectorAll('.popup');
	// console.log(popUps);
	for (let index = 0; index < popUps.length; index++) {
		const popUp = popUps[index];
		// console.log(popUp.classList.contains(popup_name));

		if (popUp.classList.contains(popup_name)) {
			popupOpen(popUp);
		}
	}

}

//=================================

/*ВЕШАЕМ СОБЫТИЕ ПО КЛИКУ НА POPUP-LINK
если есть элементы*/
if (popupLinks.length > 0) {
	//проходим массивом по всем эл 
	for (let index = 0; index < popupLinks.length; index++) {
		//каждый элементв переменную
		const popupLink = popupLinks[index];
		//вешаем событие клик на popupLink
		popupLink.addEventListener("click", function (e) {
			//в переменную popupName кладём popupLink без знака #
			const popupName = popupLink.getAttribute('href').replace('#', '');
			//в переменную cerentPopup елемент с id popupName
			const curentPopup = document.getElementById(popupName);
			//полученный объект отправляем в функцию открытия попап
			popupOpen(curentPopup);
			//предотвращение перезагрузки страницы при переходе по ссылке при открытии попап
			e.preventDefault();
		});
	}
}

//ВЕШАЕМ СОБЫТИЕ ПО КЛИКУ НА КНОПКУ ЗАКРЫТИЯ ПОПАП
//получаем все кнопки закрытия который находится внутри попап
const popupCloseIcon = document.querySelectorAll('.popup__close');
//если есть
if (popupCloseIcon.length > 0) {
	//перебираем
	for (let index = 0; index < popupCloseIcon.length; index++) {
		//каждый в переменную el
		const el = popupCloseIcon[index];
		//вешаем клик
		el.addEventListener("click", function (e) {
			//отправляем в функ popupClose объект который является ближайшим родителем нажатого лемента с классом popup
			popupClose(el.closest('.popup'));
			//предотвращение перезагрузки страницы при переходе по ссылке при открытии
			e.preventDefault();
		});
	}
}

//ФУНКЦИЯ ОТКРЫТИЯ ПОПАП
//объявляем функ передавая объект по индентификатору
export function popupOpen(curentPopup) {
	//если существует и разблокирован
	if (curentPopup && unlock) {
		//активный попап в переменную
		const popupActive = document.querySelector('.popup._active');
		//если popupActive существует
		if (popupActive) {
			//отправляем в функ popupClose параметр popupActive=false т.е. закрываем попап
			popupClose(popupActive, false);
			//иначе
		} else {
			//блочим body
			bodyLock();
		}
		// console.log(curentPopup);

		//добавляем класс open нашему попап
		curentPopup.classList.add('_active');
		//вешаем событие при клике на попап
		curentPopup.addEventListener("click", function (e) {
			//если нажатие не на объект содержащий popup__content
			if (!e.target.closest('.popup__content')) {
				//в функцию закртия передаем ближайший объект содержщий popup
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}
/*ФУНКЦИЯ ЗАКРЫТИЯ ПОПАП
передаем активный объекти, а так же стоит ли использовать блокирование скрола в этот раз или нет
это нужно для того, чтобы мы могли открывать попап внутри попап*/
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		//у активного попапа убераем класс open
		popupActive.classList.remove('_active');
		/*если есть открытый попап мы запрещаем ему выполнять bodyUnLock();
		таким образом при открытом попапе и вновь вызванном скрол будет залочен и не разлочится*/
		if (doUnlock) {
			bodyUnLock();
		}
	}
}

//БЛОКИРОВКА BODY
function bodyLock() {
	//внутренняя ширина окна минус ширина оболочки wrapper
	//Для избавления сдвига контента при появлении полосы прокрутки
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
	//есть ли такие объекты
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			//каждый объект
			const el = lockPadding[index];
			//добавляет в html стиль padding-right: для всех элементов с классом lock-padding
			el.style.paddingRight = lockPaddingValue;
		}
	}
	//добавляет в html стиль padding-right: для body
	body.style.paddingRight = lockPaddingValue;
	//даем для body клас lock
	body.classList.add('_lock');

	//на время лочим переменную unlock
	unlock = false;
	//через какое-то время
	setTimeout(function () {
		//разблокируем
		unlock = true;
		//передаем заданное время с помощью переменной
	}, timeout);
}

//ОТКРЫТИЕ СКРОЛА И УБИРАНИЕ ПАДДИНГОВ
function bodyUnLock() {
	//скрол появляется только когда закончится анимация
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				//убераем паддинг с каждого объекта
				el.style.paddingRight = '0px';
			}
		}
		//убираем паддинг с body
		body.style.paddingRight = '0px';
		//убираем класс lock c body
		body.classList.remove('_lock');
		//значение задержки в переменной
	}, 0);

	//на время лочим переменную unlock
	unlock = false;
	//через какое-то время
	setTimeout(function () {
		//разблокируем
		unlock = true;
		//передаем заданное время с помощью переменной
	}, timeout);
}
//ЗАКРЫТИЕ ПОПАП ПО КЛАВИШЕ ESCAPE
//слушаю нажате клавиши
document.addEventListener("keydown", function (e) {
	//если нажатие клавиши равно коду 27(клавиша ESC)
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup._active');
		//вызываем функцию закрытия активного попап
		popupClose(popupActive);
	}
});
//</POPUP>=================================
