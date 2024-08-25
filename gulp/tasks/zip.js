import * as del from "del";
import zipPlugin from "gulp-zip";

export const zip = () => {
	delete (`./${app.path.rootFolder}.zip`); //удаляем если архив существует
	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
		.pipe(app.plugins.plumber( //обработка ошибок dj время компиляции
			app.plugins.notify.onError({ //уведомление о ошибках
				title: "ZIP",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(zipPlugin(`${app.path.rootFolder}.zip`))
		.pipe(app.gulp.dest('./')); //перенос в папку назначения созданные и обработанные файлы
}