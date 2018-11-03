var gulp = require("gulp");
var mocha = require("gulp-mocha");

gulp.task('run-tests', function(){
    let errorCount = 0;
    return gulp.src('./src/__tests__/*.spec.js')
        .pipe(mocha({
            reporter: 'nyan',
            exit: true
        }))
        .once('error', function() {
            errorCount++;
        })
});
  

gulp.task('watch', function() {
    gulp.watch(['src/**/*.js'], ['run-tests']);
});