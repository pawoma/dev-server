const serve = require('gulp-serve')
const livereload = require('gulp-livereload')
const gulp = require('gulp')
const path = require('path')
const inject = require('connect-livereload')()

const rootPath = path.resolve(__dirname, './www')


gulp.task('watch', function () {
    livereload.listen({
        start: true
    })

    let watcher = gulp.watch(rootPath)
    watcher.on('change', function (e) {
        livereload.changed(e)
    })
})


gulp.task('serve', serve({
    root: [rootPath],
    hostname: 'localhost',
    port: 3001,
    // inject livereload script ot html
    middleware: inject
}))

gulp.task('default', gulp.parallel('serve', 'watch'))



