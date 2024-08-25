import { configFTP } from "../config/ftp.js";
import vinylFTP from "vinyl-ftp";
import util from "gulp-util";


export const ftp = () => {
	configFTP.log = util.log;
	const ftpConnect = vinylFTP.create(configFTP);
	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
		.pipe(app.plugins.plumber( //обработка ошибок dj время компиляции
			app.plugins.notify.onError({ //уведомление о ошибках
				title: "FTP",
				message: "Error: <%= error.message %>"
			})
		))
		.pipe(webpack({
			mode: app.isBuild ? 'production' : 'development', //режим разработчика
			output: {
				filename: "app.min.js", //указываем файл результата
			}
		}))
		.pipe(ftpConnect.dest(`${app.path.ftp}/${app.path.rootFolder}`)); //перенос в папку назначения созданные и обработанные файлы
}