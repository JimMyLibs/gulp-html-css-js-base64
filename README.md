# gulp-html-css-js-base64 #

- 1、 基础功能

> 将CSS文件中的图片url转为base64.
```
    gulp.src(*.css)
        .pipe(base64({
            baseDir:'src/css',
            fileType: 'css',
            maxImageSize: 8*1024, // bytes 
            debug: false
        }))
        .pipe(gulp.dest('build'));
```
- 2、 进阶功能
> 自己配置正则表达式，将html、js等其他格式文件中的图片转为base64.
```
    gulp.src(*.html)
        .pipe(base64({
            baseDir: 'src',
            fileType: 'html',
            maxImageSize: 8*1024, // bytes 
            rule: /img\/(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)/g,        
            debug: false
        }))
        .pipe(gulp.dest('build'));
```