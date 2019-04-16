const serve = require('gulp-serve')
const livereload = require('gulp-livereload')
const gulp = require('gulp')
const path = require('path')

const inject = require('connect-livereload')()

const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

// const md5 = require("gulp-md5-plus");

const rootPath = path.resolve(__dirname, './www')


gulp.task('watch', function () {
    livereload.listen({
        start: true
    })

    let watcher = gulp.watch(rootPath)
    watcher.on('change', function (e) {
        console.log(e)

        if (path.extname(e) === '.less') {
            let dir = path.resolve(e, '..')
            gulp.src(e)
                .pipe(less({
                    plugins: [autoprefix]
                }))
                .pipe(gulp.dest(dir))
                .on('end',function(){
                    let fileName = path.basename(e,'.less')
                    let fileSrc =  path.join(dir,`${fileName}.css`)
                    livereload.changed(fileSrc)
                })  

        }
        livereload.changed(e)
    })
})


// gulp.task('less', function (e) {
//     let dir = path.resolve(e, '..')
//     return gulp.src(e)
//         .pipe(less({
//             plugins: [autoprefix]
//         }))
//         .pipe(gulp.dest(dir));
// });

gulp.task('serve', serve({
    root: [rootPath],
    hostname: '0.0.0.0',
    port: 8000,
    // inject livereload script ot html
    middleware: inject
}))

gulp.task('default', gulp.parallel('serve', 'watch'))


// const gulp = require('gulp');
// const webserver = require('gulp-webserver');

// gulp.task('webserver', function () {
//     gulp.src('./www')
//         .pipe(webserver({
//             host: '192.168.1.185',
//             port: 8000,
//             livereload: true,
//             // open: '/',
//             directoryListing: {
//                 enable: true,
//                 path: './www'
//             },
//             proxies: [
//                 {
//                     source: '/RongoList/', target: 'http://wx.rongo.net.cn/RongoList/'
//                 },
//                 {
//                     source: '/JSSDK/', target: 'http://wx.rongo.net.cn/JSSDK/'
//                 }
//             ]
//         }))
// });
// gulp.task('default', gulp.parallel('webserver'));






