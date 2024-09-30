//<IsWEBP>================================================================
//   Проверка поддержки webp.
// Добавление класса webp или no-webp для HTML
// в зависимости от поддержки браузером

// import { sources } from "webpack";

export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src =
			'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
	};
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = (support === true) ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}
isWebp();
//</IsWEBP>================================================================

//<IE Ibg>================================================================
// Адаптивное изображение для IE Ibg.
// Для корректного отображения картинок в Internet Explorer добавляет класс
// .ibg и применяет атрибут background для упрощения адаптива.

export function ibg() {
	// if (isIE()) {
	let ibg = document.querySelectorAll('._ibg');
	for (let i = 0; i < ibg.length; i++) {
		let imageImg = ibg[i].querySelector('img');
		let imageWebp = ibg[i].querySelector('[type="image/webp"]');
		if (imageImg) {
			if (document.documentElement.classList.contains('webp')) {
				ibg[i].style.backgroundImage = 'url(' + imageWebp.getAttribute('srcset') + ')';
			}
			else ibg[i].style.backgroundImage = 'url(' + imageImg.getAttribute('src') + ')';
			ibg[i].style.backgroundPosition = '0 0';
			ibg[i].style.backgroundSize = 'cover';
			imageImg.style.opacity = '0';
			imageImg.style.visibility = 'hidden';
		}
		// }
	}
}
// ibg();

// let ua = window.navigator.userAgent;
// let msie = ua.indexOf("MSIE ");
// function isIE() {
// 	ua = navigator.userAgent;
// 	let is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
// 	return is_ie;
// }
//</IE Ibg>=================================

//<isMobile>================================================================
//Проверка на каком устройстве работаем
/* export const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};
if (isMobile.any()) {
	document.body.classList.add('_touch');
} else {
	document.body.classList.add('_pc');
} */
// Возвращает мобильный с которого зашли
// export const isMobile = function () {
// 	var check = false;
// 	(function (a) {
// 		if (
// 			/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
// 				a
// 			) ||
// 			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
// 				a.substr(0, 4)
// 			)
// 		)
// 			check = true;
// 	})(navigator.userAgent || navigator.vendor || window.opera)
// 	return check;
// };
// возвращает true если зашли с мобильного
// export const isMobileOrTablet = function () {
// 	var check = false
// 		; (function (a) {
// 			if (
// 				/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
// 					a
// 				) ||
// 				/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
// 					a.substr(0, 4)
// 				)
// 			)
// 				check = true
// 		})(navigator.userAgent || navigator.vendor || window.opera)
// 	return check
// }
//</isMobile>================================================================

//=================================
//  функция трансформирует размер изображения с байт в нормальный размер
// export function bytesToSize(bytes) {
// 	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
// 	if (!bytes) {
// 		return '0 Byte'
// 	}
// 	const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
// 	return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
// }
//=================================

//=================================
//  функция создает HTML элементы
// export const element = (tag, classes = [], content) => {
// 	const node = document.createElement(tag)

// 	if (classes.length) {
// 		node.classList.add(...classes)
// 	}

// 	if (content) {
// 		node.insertAdjacentHTML('beforeend', content)
// 	}

// 	return node
// }
//=================================

//=================================
//  Универсальная FETCH функция для работы с API используя промисы(resolve, reject) ***
// export function sendRequest(method, url, body = null) {
// 	const headers = {
// 		'Content-Type': 'application/json',
// 	}

// 	// метод принимает 2 параметра url и обьект настроек при GET
// 	return fetch(url, {
// 		method: method,
// 		// body: JSON.stringify(body),
// 		headers: headers,
// 	}).then((response) => {
// 		//если все хорошо и флаг свойство ok в true
// 		if (response.ok) {
// 			return response.json()
// 		}

// 		//обрабатываем ошибку
// 		return response.json().then((error) => {
// 			const e = new Error('Что-то пошло не так')
// 			e.data = error
// 			throw e
// 		})
// 	})
// }
//=================================

//=================================
//пример получения данных методом GET используя нашу функцию
// sendRequest('GET', requestURL)
//     .then(data => console.log(data))
//     .catch(err => console.log(err))
//=================================

//=================================
//  прокрутка сраницы => кнопка прокрутки вверх
// window.addEventListener('scroll', () => {
//   // высота экрана
//   const windowScroll = window.innerHeight
//   const btn = document.querySelector('.btn__scroll-top')
//   if (pageYOffset > windowScroll) {
//     btn.classList.add('btn__scroll-top--active')
//     btn.addEventListener('click', (e) => {
//       // передаю в функцию координаты кнопки относительно верха окна
//       smothScroll(e.clientY)
//     })
//   } else {
//     btn.classList.remove('btn__scroll-top--active')
//   }
// })
//=================================

//=================================
// плавная прокрутка по координатам
// export const smothScroll = (h) => {
// 	let i = h || 0;
// 	if (i > 0) {
// 		setTimeout(() => {
// 			window.scrollTo(0, i);
// 			smothScroll(i - 20);
// 		}, 10);
// 	}
// };
//=================================

//=================================
//  удаляет клссы
// export function removeClassest(arr, removeClass) {
// 	if (arr.length > 0) {
// 		for (let item of arr) {
// 			item.classList.remove(removeClass);
// 		};
// 	};
// };
//=================================