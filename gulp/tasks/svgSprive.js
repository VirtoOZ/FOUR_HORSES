import svgSprite from "gulp-svg-sprite";

export const svgSprive = () => {
	return app.gulp.src(`${app.path.src.svgicons}`, {})
		.pipe(app.plugins.plumber( //обработка ошибок во время компиляции
			app.plugins.notify.onError({ //уведомление о ошибках
				title: "SVG",
				message: "Error: <%= error.message %>"
			})))
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: `../icons/icons.svg`,
					// Создавать страницу с перечнем иконок
					expample: true //создает html страничку с превью
				}
			},
		}))
		.pipe(app.gulp.dest(`${app.path.build.images}`)); //перенос в папку назначения созданные и обработанные файлы
}