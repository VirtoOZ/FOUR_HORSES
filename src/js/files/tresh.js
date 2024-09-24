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
console.log(sliderPartCount);

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
	sliderPartCount += addCoef;
	if (sliderPartCount <= sliderPartLength && sliderPartCount >= 1) {
		if (sliderPartCount < sliderPartLength) {
			paginationCurrent.innerHTML = sliderPartCount;
		} else {
			paginationCurrent.innerHTML = sliderPartLength;
		}
	} else {
		if (sliderPartCount > sliderPartLength && addCoef == 3) {
			paginationCurrent.innerHTML = sliderPartLength;
			// sliderPartCount = sliderPartLength;
		}
		if (sliderPartCount > sliderPartLength + 1 && addCoef == 3) {
			sliderPartCount = addCoef;
			paginationCurrent.innerHTML = sliderPartCount;
		}
		if (sliderPartCount > sliderPartLength && addCoef == 2) {
			sliderPartCount = addCoef;
			paginationCurrent.innerHTML = sliderPartCount;
		}
		if (sliderPartCount > sliderPartLength && addCoef == 1) {
			sliderPartCount = addCoef;
			paginationCurrent.innerHTML = sliderPartCount;
		}
	}
	moveSliderPart();
	console.log(sliderPartCount);

}
// Функция Слайдер назад
function prevPartSlide() {
	console.log(sliderPartCount);
	sliderPartCount -= addCoef;
	if (sliderPartCount <= sliderPartLength) {
		paginationCurrent.innerHTML = sliderPartCount;

		// console.log(sliderPartCount);
	} else {
		// sliderPartCount -= addCoef;
		paginationCurrent.innerHTML = sliderPartCount;
	}
	if (sliderPartCount < 1 && addCoef == 3) {
		sliderPartCount = sliderPartLength - (Math.floor(sliderPartLength / addCoef) - addCoef);
		console.log(sliderPartCount);
		paginationCurrent.innerHTML = sliderPartLength;
	}
	if (sliderPartCount < 1 && addCoef == 2) {
		sliderPartCount = sliderPartLength;
		console.log(sliderPartCount);
		paginationCurrent.innerHTML = sliderPartLength;
	}
	if (sliderPartCount < 1 && addCoef == 1) {
		sliderPartCount = sliderPartLength;
		// 	// sliderPartCount = sliderPartLength - 1;
		// 	sliderPartCount = sliderPartLength / addCoef;
		// 	console.log(sliderPartCount);
		paginationCurrent.innerHTML = sliderPartLength;
	}
	moveSliderPart();
}
// Функция движение слайда
function moveSliderPart() {
	let sliderWidth = sliderPart.offsetWidth + 20;
	if (addCoef >= 2) {
		sliderPartLine.style.transform = `translateX(${-((sliderPartCount - addCoef) / addCoef) * sliderWidth}px)`;
	} else {
		console.log('1');
		sliderPartLine.style.transform = `translateX(${-(sliderPartCount - 1) * sliderWidth}px)`;
	}
}
// Автопрокрутка слайдов
// setInterval(() => {
// 	nextPartSlide();
// }, 4000);
//</SLIDER-PARTICIPANTS>=================================