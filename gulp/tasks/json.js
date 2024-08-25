import webpack from "webpack-stream";
import fileinclude from "gulp-file-include";

export const json = () => {
	return app.gulp.src(app.path.src.json, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber( //обработка ошибок во время компиляции
			app.plugins.notify.onError({ //уведомление о ошибках
				title: "JSON",
				message: "Error: <%= error.message %>"
			})
		))

		.pipe(app.gulp.dest(app.path.build.json)) //перенос в папку назначения созданные и обработанные файлы
}