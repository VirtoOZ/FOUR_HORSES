import dartSass from 'sass'; //препроцессор
import gulpSass from 'gulp-sass'; //плагин для запуска препроцессора
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; //сжатие CSS файла
import webpcss from 'gulp-webpcss'; //вывод webp изображений
import autoprefixer from 'gulp-autoprefixer'; //добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; //группировки медиа запросов



const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber( //обработка ошибок
			app.plugins.notify.onError({ //уведомление о ошибках
				title: "SCSS",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(app.plugins.replace(/@img\//g, '../img/')) //обработка псевдонимов/алиасов
		.pipe(sass({//компиляция sass
			outputStyle: 'expanded'
		}))
		.pipe(
			app.plugins.if(
				app.isBuild,
				groupCssMediaQueries()
			)
		)

		.pipe(app.plugins.if(app.isBuild, webpcss({ webpClass: '.webp', noWebpClass: '.no-webp' })))
		.pipe(app.plugins.if(app.isBuild, autoprefixer({
			grid: true,
			overrideBrowserslist: ["last 3 version"],
			cascade: true,
		})))
		// Раскомментировать если нужен не сжатый дубль файла стилей
		.pipe(app.gulp.dest(app.path.build.css))

		.pipe(app.plugins.if(app.isBuild, cleanCss()))
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(app.gulp.dest(app.path.build.css)) //перенос в папку назначения созданные и обработанные файлы
		.pipe(app.plugins.browsersync.stream()); //включает обновление если произошли изменения в файле
}