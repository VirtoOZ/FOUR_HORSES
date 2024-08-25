export const copy = () => {
	return app.gulp.src(app.path.src.files)//метод в галпе .src который получает доступ к файлам и папкам по указанному пути которые в скобках 
		.pipe(app.gulp.dest(app.path.build.files))
}