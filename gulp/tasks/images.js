import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
	return app.gulp.src(app.path.src.images)
		.pipe(app.plugins.plumber( //обработка ошибок dj время компиляции
			app.plugins.notify.onError({ //уведомление о ошибках
				title: "IMAGES",
				message: "Error: <%= error.message %>"
			})
		))

		.pipe(app.plugins.newer(app.path.build.images)) //проверяем картинки в папке с результатом
		.pipe(app.plugins.if(app.isBuild, webp()))
		.pipe(app.plugins.if(app.isBuild, app.gulp.dest(app.path.build.images))) //перенос в папку назначения созданные и обработанные файлы
		.pipe(app.plugins.if(app.isBuild, app.gulp.src(app.path.src.images))) //проверяем картинки в папке с результатом
		.pipe(app.plugins.if(app.isBuild, app.plugins.newer(app.path.build.images))) //проверяем картинки в папке с результатом
		.pipe(app.plugins.if(app.isBuild, imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			interlaced: true,
			optimizationLevel: 3 //0 to 7})   app.plugins.newer(app.path.build.images))) //проверяем картинки в папке с результатом
		})))
		.pipe(app.gulp.dest(app.path.build.images)) //перенос в папку назначения созданные и обработанные файлы
		.pipe(app.gulp.src(app.path.src.svg)) //доступ к svg
		.pipe(app.gulp.dest(app.path.build.images)) //перенос в папку назначения созданные и обработанные файлы
		.pipe(app.plugins.browsersync.stream()); //обновляем браузер
}