import gulp from "gulp";
import imagemin from "gulp-imagemin";
import del from "del";

gulp.task('deleteImages', function() {
	return del('./public/assets/images')
})

gulp.task('moveImages',['deleteImages'], function() {
	return gulp.src('./src/client/images/**/*')
				.pipe(imagemin({
					progressive: true,
					interlaced: true,
					multipass: true,
				}))
				.pipe(gulp.dest('./public/assets/images'));
})
