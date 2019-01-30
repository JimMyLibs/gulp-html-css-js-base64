var gulp = require('gulp');
var base64 = require("gulp-html-css-js-base64");

gulp.task('html', async () => {
    gulp.src('./src/*.html')
        .pipe(await base64({
            baseDir: 'src/',
            fileType: 'html',
            // maxImageSize: 8 * 1024, // bytes 
            rule: /img\/(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)/g,
            debug: true
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', async () => {
    gulp.src('./src/css/*.css')
        .pipe(await base64({
            baseDir: 'src/css',
            fileType: 'css',
            // maxImageSize: 8 * 1024, // bytes 
            debug: true
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('js', async () => {
    gulp.src('./src/js/*.js')
        .pipe(await base64({
            baseDir: 'src/js',
            fileType: 'js',
            // maxImageSize: 8 * 1024, // bytes 
            rule: /img\/(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)/g,
            debug: true
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default', gulp.series(gulp.parallel('html', 'css', 'js'), function() {
    console.log('处理完成')
}));