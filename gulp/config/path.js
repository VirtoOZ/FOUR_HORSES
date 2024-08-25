import * as nodePath from 'path'; // получаем имя папки проекта
const rootFolder = nodePath.basename(nodePath.resolve());//c помощью модуля path, в константу получем имя папки проекта

const buildFolder = `./dist`; //также можно использовать rootFolder
const srcFolder = `./src`;

export const path = {
	// объект путей с результатом
	build: {
		html: `${buildFolder}/`,
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		images: `${buildFolder}/img/`,
		fonts: `${buildFolder}/fonts/`,
		files: `${buildFolder}/files/`,
		videos: `${buildFolder}/videos/`,
		json: `${buildFolder}/json/`,

	},
	// объект путей к исходным файлам
	src: {
		favicon: `${srcFolder}/img/favicon.{jpg,jpeg,png,gif,ico,webp}`, //путь к папке c файлом стилей
		html: `${srcFolder}/*.html`, //путь к папке в которой есть файлы html
		js: [`${srcFolder}/js/vendors.js`, `${srcFolder}/js/app.js`], //путь к папке c файлом стилей
		scss: `${srcFolder}/scss/style.scss`, //путь к папке c файлом стилей
		images: [`${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,ico}`, `!**/favicon.*`], //путь к папке c файлом стилей
		fonts: `${srcFolder}/fonts/*.ttf`, //путь к папке которую хотим копировать
		svg: `${srcFolder}/img/**/*.svg`, //путь к папке c файлом стилей
		svgicons: `${srcFolder}/svgicons/*.svg`, //путь к папке c файлом стилей
		// html: `${srcFolder}/*.pug`, // Для Pug`, путь к папке в которой есть файлы html
		files: `${srcFolder}/files/**/*.*`, //путь к папке которую хотим копировать
		videos: `${srcFolder}/videos/*.*`, //путь к папке которую хотим копировать
		json: `${srcFolder}/json/*.*`, //путь к папке которую хотим копировать
	},
	// объект путей к файлам за которыми нужно следить
	watch: {
		html: `${srcFolder}/**/*.html`,
		js: `${srcFolder}/js/**/*.js`, //путь к файлам которые необходимо отслеживать на изменение
		scss: `${srcFolder}/scss/**/*.scss`, //путь к файлам которые необходимо отслеживать на изменение
		// html: `${srcFolder}/**/*.pug`, // Для Pug
		// images: `${srcFolder}/img/**/*.+(jpg|jpeg|png|gif|webp|ico|svg)`, //путь к папке c файлом стилей
		images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,ico,svg}`, //путь к папке c файлом стилей
		files: `${srcFolder}/files/**/*.*`, //путь к файлам которые необходимо отслеживать на изменение
		json: `${srcFolder}/json/*.*`, //путь к файлам которые необходимо отслеживать на изменение
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder,
	ftp: `test`,
}