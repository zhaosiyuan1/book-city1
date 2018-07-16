// 引入插件
var gulp = require('gulp');

var scss = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

var cleanCss = require('gulp-clean-css');

var webserver = require('gulp-webserver');

var fs = require('fs');

var url = require('url');

var path = require('path');

var mock = require('./mock'); // 默认查找index.js文件

// 开发环境

// 启服务
gulp.task('devServer', ['devScss'], function() {
    gulp.src('src')
        .pipe(webserver({
            port: 8888,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (/\/api/g.test(pathname)) {
                    res.end(JSON.stringify(mock(req.url)));
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});
// 编译scss
gulp.task('devScss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest('./src/css'));
});
// 监听scss的变化
gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['devScss']);
});
// 用一个任务来完成
gulp.task('dev', ['devServer', 'watch'])