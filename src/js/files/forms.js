//<QUANTITY>=================================
let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
	for (let index = 0; index < quantityButtons.length; index++) {
		const quantityButton = quantityButtons[index];

		quantityButton.addEventListener("click", function (e) {
			let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
			if (quantityButton.classList.contains('quantity__button_plus')) {
				value++;
			} else {
				value = value - 1;
				if (value < 1) {
					value = 1
				}
			}
			quantityButton.closest('.quantity').querySelector('input').value = value;
		});
	}
}
//</QUANTITY>=================================

//<FORM>=================================
// *** Работа с формами ***
const forms = document.querySelectorAll('form');
const dataValue = document.querySelectorAll('[data-value]');

// Заполняю плейсхолдер формы с data-value
if (dataValue.length > 0) {
	for (let item of dataValue) {
		item.placeholder = item.dataset.value;
	}
}
// Навешую слушателей на формы
if (forms.length > 0) {
	for (let form of forms) {
		form.addEventListener('submit', formSend);

		// *** Отправляет форму, добавить async перед функцией ***
		async function formSend(e) {
			let btn = event.target;
			let form = btn.closest('form');
			let message = form.getAttribute('data-message');

			e.preventDefault();
			// делаю валидацию
			let error = 0;
			let formData;
			if (forms.length > 0) {
				for (let form of forms) {
					// error = formValidate(form);
					error = form_validate_input(form);
					// получаю данные с полей формы
					formData = new FormData(form);
				}
			}
			// formData.append('image', formImage.files[0])
			if (error === 0) {
				//SendForm
				form_clean(form);
				if (message) {
					// console.log(message + '-message');
					topopUp(message + '-message');
					// popupOpen('message-' + message);
					e.preventDefault();
				}
				form.classList.add('_sending');
				// let response = await fetch('sendmail.php', {
				//   method: 'POST',
				//   body: formData,
				// })
				// //отправляю форму
				// if (response.ok) {
				//   let result = await response.json()
				//   alert(result.message)
				//   formPreview.innerHTML = ''
				//   form.reset()
				//   form.classList.remove('_sending')
				// } else {
				//   alert('Ошибка')
				//   form.classList.remove('_sending')
				// }

				// Временно
				// const popupMessage = document.querySelector('.popup_subscribe-message');
				// popupMessage.classList.add('open');
			} else {
				let form_error = form.querySelectorAll('._error');
				if (form_error && form.classList.contains('_goto-error')) {
					_goto(form_error[0], 1000, 50);
				}
				event.preventDefault();
				alert('Заполните обязательные поля');
				// const errorElement = element('span', ['form__error'], 'Ошибка');
				// const formError = document.querySelector('form__error');
				// formError.append(errorElement);
			}
		}
	}
}
// *** валидирует формы ***
function formValidate(form) {
	let error = 0;
	let formReq = document.querySelectorAll('._req');
	if (formReq.length > 0) {
		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			form_remove_error(input);
			// if (!_is_hidden(input)) {
			// 	error += form_validate_input(input)
			// }
			if (input.classList.contains('_email')) {
				if (email_test(input)) {
					form_add_error(input);
					error++;
				}
			} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
				form_add_error(input);
				error++;
			} else {
				if (input.value === '') {
					form_add_error(input);
					error++;
				}
			}
		}
	}
	return error;
}

function form_validate_input(input) {
	let error = 0;
	let input_g_value = input.getAttribute('data-value');

	// 

	let formReq = document.querySelectorAll('._req');
	if (formReq.length > 0) {
		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			form_remove_error(input);
			// if (!_is_hidden(input)) {
			// 	error += form_validate_input(input)
			// }
			if (input.classList.contains('_email')) {
				if (input.value != input_g_value) {
					let em = input.value.replace(" ", "");
					input.value = em;
				}
				if (email_test(input)) {
					form_add_error(input);
					error++;
				} else {
					form_remove_error(input);
				}
			} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
				form_add_error(input);
				error++;
			} else {
				if (input.value == '' || input.value == input_g_value) {
					form_add_error(input);
					error++;
				} else {
					form_remove_error(input);
				}
			}
		}
	}
	return error;
}
// 


// if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
// if (input.value != input_g_value) {
// 	let em = input.value.replace(" ", "");
// 	input.value = em;
// }
// if (email_test(input) || input.value == input_g_value) {
// 	form_add_error(input);
// 	error++;
// } else {
// 	form_remove_error(input);
// }
// } else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
// 	form_add_error(input);
// 	error++;
// } else {
// if (input.value == '' || input.value == input_g_value) {
// 	form_add_error(input);
// 	error++;
// } else {
// 	form_remove_error(input);
// }
// }
// return error;
// }

function form_add_error(input) {
	input.classList.add('_error');
	input.parentElement.classList.add('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
	let input_error_text = input.getAttribute('data-error');
	if (input_error_text && input_error_text != '') {
		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
	}
}
function form_remove_error(input) {
	input.classList.remove('_error');
	input.parentElement.classList.remove('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
}
//  Добавляет и удаляет класс _error у формы и инпута 
// function formAddError(input) {
// 	input.parentElement.classList.add('_error');
// 	input.classList.add('_error');
// }

// function formRemoveError(input) {
// 	input.parentElement.classList.remove('_error');
// 	input.classList.remove('_error');
// }

function form_clean(form) {
	let inputs = form.querySelectorAll('input,textarea');
	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el.parentElement.classList.remove('_focus');
		el.classList.remove('_focus');
		el.value = el.getAttribute('data-value');
	}
	let checkboxes = form.querySelectorAll('.checkbox__input');
	if (checkboxes.length > 0) {
		for (let index = 0; index < checkboxes.length; index++) {
			const checkbox = checkboxes[index];
			checkbox.checked = false;
		}
	}

	let selects = form.querySelectorAll('select');
	if (selects.length > 0) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_default_value = select.getAttribute('data-default');
			select.value = select_default_value;
			select_item(select);
		}
	}
}

// *** Функция теста email ***
function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
}

let viewPass = document.querySelectorAll('.form__viewpass');
for (let index = 0; index < viewPass.length; index++) {
	const element = viewPass[index];
	element.addEventListener("click", function (e) {
		if (element.classList.contains('_active')) {
			element.parentElement.querySelector('input').setAttribute("type", "password");
		} else {
			element.parentElement.querySelector('input').setAttribute("type", "text");
		}
		element.classlist.toggle('_active');
	});
}
import { topopUp } from "../files/popup.js";
// import { popupOpen } from "../files/popup.js";
//</FORM>=================================

//<SELECT>=================================
let selects = document.getElementsByTagName('select'); //получаем элемент по имени тега
if (selects.length > 0) { //если есть хотябы один
	selects_init(); //вызываем инициализацию
}
function selects_init() { //инициализация
	for (let index = 0; index < selects.length; index++) { //проходим циклом 
		const select = selects[index]; //каждый найденный selects кладем в константу select
		select_init(select); //вызов c параметром найденного select
	}
	//select_caLlback();
	document.addEventListener('click', function (e) { //вешам событие по клику 
		selects_close(e); //вызов функции закрытия c параметром нажатия 
	}); //получается фунция закрывает открытый select если нажимается клавиша мыши
	document.addEventListener('keydown', function (e) { //при нажатии...
		if (e.which == 27) { //клавиши Esc
			selects_close(e); //получается фунция закрывает открытый select если нажимается кнопка Esc
		}
	});
}
function selects_close(e) {
	const selects = document.querySelectorAll('.select'); //получаем коллекцию всех елементов c классом .select
	if (!e.target.closest('.select')) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			select.classList.remove('_active');
			_slideUp(select_body_options, 100);
		}
	}
}
function select_init(select) {
	const select_parent = select.parentElement;
	const select_modifikator = select.getAttribute('class');
	const select_selected_option = select.querySelector('option:checked');//находим веделенный option

	select.setAttribute('data-default', select_selected_option.value);//устанавливает data-defoult значение выделенного option
	select.style.display = 'none';//скрываем селект

	select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');//добавляем блок селекта 

	let new_select = select.parentElement.querySelector('.select');

	new_select.appendChild(select);
	select_item(select);
}
function select_item(select) {
	const select_parent = select.parentElement; // родитель, блок select
	const select_items = select_parent.querySelector('.select__item');//находим в родителе 
	const select_options = select.querySelectorAll('option');
	const select_selected_option = select.querySelector('option:checked');
	const select_selected_text = select_selected_option.text;
	const select_type = select.getAttribute('data-type');

	if (select_items) {
		select_items.remove();
	}

	let select_type_content = '';
	if (select_type == 'input') {
		select_type_content = '<div class="select__value"><input>' + select_selected_text + '</input></div>';
	} else {
		select_type_content = '<div class="select__value"><span>' + select_selected_text + '</span></div>';
	}

	select_parent.insertAdjacentHTML('beforeend',
		'<div class="select__item">' +
		'<div class="select__title">' + select_type_content + '</div>' +
		'<div class="select__options">' + select_get_options(select_options) +
		'</div></div>');

	select_actions(select, select_parent);
}
function select_actions(original, select) {
	const select_item = select.querySelector('.select__item');
	const select_body_options = select.querySelector('.select__options');
	const select_options = select.querySelectorAll('.select__option');
	const select_type = original.getAttribute('data-type');
	const select_input = select.querySelector('.select__input');

	select_item.addEventListener('click', function () {
		let selects = document.querySelectorAll('.select');
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			const select_body_options = select.querySelector('.select__options');
			if (select != select_item.closest('.select')) {
				select.classList.remove('_active');
				_slideUp(select_body_options, 100);
			}
		}
		_slideToggle(select_body_options, 100);
		select.classList.toggle('_active');
	});

	for (let index = 0; index < select_options.length; index++) {
		const select_option = select_options[index];
		const select_option_value = select_option.getAttribute('data-value');
		const select_option_text = select_option.innerHTML;

		if (select_type == 'input') {
			select_input.addEventListener('keyup', select_search)
		} else {
			if (select_option.getAttribute('data-value') == original.getAttribute('data-default')) {
				select_option.style.display = 'none';
			}
		}

		select_option.addEventListener('click', function () {
			for (let index = 0; index < select_options.length; index++) {
				const el = select_options[index];
				el.style.display = 'block';
			}
			if (select_type == 'input') {
				select_input.value = select_option_text;
				original.value = select_option_value;
			} else {
				select.querySelector('.select__value').innerHTML = select_option_text;
				original.value = select_option_value;
				select_option.style.display = 'none';
			}
		});
	}
}
function select_get_options(select_options) {
	if (select_options) {
		let select_options_content = '';
		for (let index = 0; index < select_options.length; index++) {
			const select_option = select_options[index];
			const select_option_value = select_option.value;

			if (select_option_value != '') {
				const select_option_text = select_option.text;
				select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
			}
		}
		return select_options_content;
	}
}
function select_search(e) {
	let select_block = e.target.closest('.select ').querySelector('.search');
	let select_options = e.target.closest('.select ').querySelector('options');
	let select_search_text = e.target.value.toUpperCase();

	for (let i = 0; i < select_options.length; i++) {
		let select_option = select_options[i];
		let select_txt_value = select_option.textContent || select_search_text;
		if (select_txt_value.toUpperCase().indexOf(select_search_text)) {
			select_option.style.display = "";
		} else {
			select_option.style.display = "none";
		}
	}
}
function selects_update_all() {
	let selects = document.querySelectorAll('select');
	if (selects) {
		for (let index = 0; index < selects.length; index++) {
			const select = selects[index];
			select_item(select);
		}
	}
}
//</SELECT>=================================

//<DATA-SPOLLERS>=================================
// data-spollers - функция реализует адаптивный аккордеон 
// с data атрибутами data-spoller (добавляет класс true)
// spollers
const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
	// Получение обычных спойлеров
	const spollersRegular = Array.from(spollersArray).filter(
		(item, index, self) => {
			return !item.dataset.spollers.split(',')[0];
		}
	);
	// Инициализация обычных спойлеров
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	// Получение спойлеров с медиа запросами
	const spollersMedia = Array.from(spollersArray).filter(
		(item, index, self) => {
			return item.dataset.spollers.split(',')[0];
		}
	);

	// Инициализация спойлеров с медиа запросами
	if (spollersMedia.length > 0) {
		const breakpointsArray = [];
		spollersMedia.forEach((item) => {
			const params = item.dataset.spollers;
			const breakpoint = {};
			const paramsArray = params.split(',');
			breakpoint.value = paramsArray[0];
			breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';//трим удаляет пробелы
			breakpoint.item = item;
			breakpointsArray.push(breakpoint);
		});

		// Получаю уникальные брекпоинты
		let mediaQueries = breakpointsArray.map((item) => {
			return ('(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type)
		});

		mediaQueries = mediaQueries.filter((item, index, self) => {
			return self.indexOf(item) === index;
		});
		// Работа с каждым брекпоинтом
		mediaQueries.forEach((breakpoint) => {
			const paramsArray = breakpoint.split(',');//разделит строку позапятой на масс объектов
			const mediaBreakpoint = paramsArray[1];
			const mediaType = paramsArray[2];
			const matchMedia = window.matchMedia(paramsArray[0]);//получение в медиазапрос

			// Обьекты с нужными условиями
			const spollersArray = breakpointsArray.filter((item) => {
				if (item.value === mediaBreakpoint && item.type === mediaType) {
					return true;
				}
			});
			// Событие
			matchMedia.addListener(function () {
				initSpollers(spollersArray, matchMedia);
			});
			initSpollers(spollersArray, matchMedia);
		});
	}
	// Инициализация
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach((spollersBlock) => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
			if (matchMedia.matches || !matchMedia) { //matchMedia.matches возвращает true если возможен медиазапрос
				spollersBlock.classList.add('_init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener('click', setSpollerAction);
			} else {
				spollersBlock.classList.remove('_init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener('click', setSpollerAction);
			}
		});
	}

	// Работа с контентом
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach((spollerTitle) => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('_active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}

	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false; //проверяем наличие атрибута
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('_active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('_active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}

	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('_active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}
/*
Для родителя спойлера пишем атрибут data-spollers
Для заголовков слайдеров пишем атрибут data-spoller
Если нужно обеспечить работу спойлеров на всех размерах экранов пишем data-spollers без параметров
Если нужно выключить\включить работу спойлеров на разных размерах экранов пишем параметры ширины и типа брекпоинта.
Например:
data-spollers="992,max" - спойлеры будут работать только на экранах меньше или равно 992px
data-spollers="768,min" - спойлеры будут работать только на экранах больше или равно 768px
Если нужно чтобы в блоке открывалься только один спойлер добавляем атрибут data-one-spoller
*/
//</DATA-SPOLLERS>=================================

//<ANIM-SLIDE>================================================================
//   Анимированное плавное открытие и закрытие блока.
// Может применяться к меню или выпадающему списку
// Выписано из видео фрилансера.
// В CSS нужно установить display: none; для родителя.

// SlideUP
// let _slideUp = (target, duration = 500) => {
export let _slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
};
// SlideDown
// let _slideDown = (target, duration = 500) => {
export let _slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none') {
		display = 'block';
	}
	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
};
//SlideToggLe
// let _slideToggle = (target, duration = 500) => {
export let _slideToggle = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		// if (target.hidden) {
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
};
//</ANIM-SLIDE>================================================================

//добавление картинки=================================
/* const formImage = document.getElementById('formImage');
const formPreview = document.getElementById('formPreview');
formImage.addEventListener("change", () => {
	uploadFile(formImage.files[0]);
});

function uploadFile(file) {
	// провераяем тип файла
	if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
		alert('Разрешены только изображения.');
		formImage.value = '';
		return;
	}
	// проверим размер файла (<2 Мб)
	if (file.size > 2 * 1024 * 1024) {
		alert('Файл должен быть менее 2 МБ. ');
		return;
	}

	var reader = new FileReader();
	reader.onload = function (e) {
		formPreview.innerHTML = `<img src="${e.target.result}" alt="Фoтo">`;
	};
	reader.onerror = function (e) {
		alert('Ошибка');
	};
	reader.readAsDataURL(file);
} */
//=================================