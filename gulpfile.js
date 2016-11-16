var gulp = require('gulp')
var concat = require('gulp-concat')
var rename = require('gulp-rename')
var ngAnnotate = require('gulp-ng-annotate')
var uglify = require('gulp-uglify');
var broswerSync = require('browser-sync');

var SrcJS = 'Development/components/**/*.js'


gulp.task('DevelopmentApp', function(){

    return gulp.src(['Development/components/shared/navbar/navbarDirective.js','Development/components/shared/ResourceFactory/resourceFactory.js',
        'Development/components/home/homeController.js', 'Development/components/view/viewController.js', 'Development/components/addmovie/AddNewMovieController.js', 'Development/components/edit/editController.js',
        'Development/components/add/AddNewMovieController.js', 'Development/components/Authentication/RegisterFactory.js','Development/components/Authentication/LoginFactory.js','Development/components/Authentication/GetTokenFactory.js', 'Development/components/Authentication/AuthenticationController.js', 'Development/components/mainapp/mainApp.js', ])
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('Development/components/'));

})


gulp.task('Vendor', function(){
    return gulp.src(['Development/bower_components/angular/angular.js' ,
    'Development/bower_components/angular-resource/angular-resource.js',
        'Development/bower_components/angular-ui-router/release/angular-ui-router.js',
        'Development/bower_components/ngStorage/ngStorage.js' , 'Development/bower_components/jquery/dist/jquery.js' , 'Development/bower_components/jquery/dist/jquery.js', 'Development/bower_components/angular-animate/angular-animate.js',  'Development/bower_components/angular-strap/dist/angular-strap.js',
         'Development/bower_components/angular-strap/dist/angular-strap.tpl.js',


    ])
        .pipe(concat('vendor.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rename('vendor.min.js'))
        .pipe(gulp.dest('Development/components/'));

})


gulp.task('watch', function(){
    broswerSync({
        server:{
            baseDir: 'Development/components/'
        }
    })
    gulp.watch(SrcJS, ['DevelopmentApp-watch'])

})


gulp.task('DevelopmentApp-watch', ['DevelopmentApp'], broswerSync.reload)


gulp.task('default' , ['watch'])