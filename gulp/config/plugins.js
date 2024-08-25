import fileInclude from "gulp-file-include";
import replace from "gulp-replace"; //поиск и замена
import plumber from "gulp-plumber"; //обработка ошибок
import notify from "gulp-notify"; //Сообщения (подсказки)
import browsersync from "browser-sync"; //локальный сервер
import newer from "gulp-newer"; //проверка обновилась ли картинка
import ifPlugin from "gulp-if"; //условное ветвление

//экспортируем объект
export const plugins = {
	fileInclude: fileInclude,
	replace: replace,
	notify: notify,
	plumber: plumber,
	browsersync: browsersync,
	newer: newer,
	if: ifPlugin,
}