var gulp = require('gulp'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	watch = require('gulp-watch'),
	sprite = require('gulp.spritesmith'),
	clean = require('gulp-clean'),
    notify = require('gulp-notify'), // 提示错误
	plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'), // css兼容处理 display: flex
	path = {
		dev: 'dev/',
		dest: '../static/'
	};

//html
// gulp.task('html',function(){
//     return gulp.src(path.views)
//         .pipe(livereload())
// });

//css
gulp.task('style', function () {
    return gulp.src(path.dev + "sass/*.scss") //该任务针对所有合并的文件
    // return gulp.src(path.dev + "sass/about.scss") //该任务针对单个合并的文件
    // gulp.src(path.dev + '/sass/merge/c.scss')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')})) // 报错提示且不中断gulp运行
        // 开发版（不压缩）
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "compact"}))
        .pipe(sourcemaps.write())
        // .pipe(gulp.dest(path.dev + '/css'))
        .pipe(autoprefixer({
            browsers: ["last 2 version", "> 5%", "> 5% in US","Firefox > 20"],
            cascade: false
        }))
        // 正式版（压缩）
        .pipe(sass({outputStyle: "compressed"})) // 压缩css代码
        .pipe(gulp.dest(path.dest + '/css'))
});

//js 多个文件合成
function jsArray(arr,fileName) {
    var file = [];
    for (var i=0; i<arr.length; i++) {
        file.push(path.dev+'js/'+arr[i]+'.js');
    }
    gulp.task(fileName, function(){
        return gulp.src(file)
        .pipe(concat(fileName+'.js'))
        //.pipe(gulp.dest(path.dev + 'js/merge')) //开发版（不压缩）
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(path.dest + 'js')) // 正式版（压缩）
    });
}
// jsArray(['a','b','c'], 'a');

//js 单个文件合成
function jsFun(fileName){
    gulp.task(fileName, function(){
        return gulp.src(['dev/js/'+fileName+'.js'])
        .pipe(concat(fileName+'.js'))
        //.pipe(gulp.dest(path.dev + 'js/merge')) //开发版（不压缩）
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(path.dest + 'js')) // 正式版（压缩）
    });
}

// jsFun('scroll-view');//公用JS
// jsFun('calendar-cncn');//公用JS

//img
// gulp.task('defaultImg', function(){
//     return gulp.src([path.dev + 'img/default/*.png', path.dev + 'img/default/*.jpg'])
//         .pipe(gulp.dest(path.dest + 'img/default/'));
// });


function spriteFun(fileName){
    gulp.task('sprite' + fileName, function () {
        var timestamp =Date.parse(new Date());
        var spriteData = gulp.src(pathM.dev + 'img/sprite/' + '/*.png')
            .pipe(sprite({
                imgName: 'sprite_' + fileName + '.png',
                cssName: 'sprite_' + fileName + '.scss',
                padding: 10,
                cssFormat: 'scss',
                cssTemplate: function (data) {
                    var arr=[];
                    data.sprites.forEach(function (sprite) {
                        arr.push(".sprite_" + sprite.name +
                            "{\n" +
                            "background: url('../img/sprite/" + sprite.escaped_image + '?' + timestamp + "') no-repeat;\n" +
                            "background-position: " + (sprite.offset_x+3) / 100 + "rem " + sprite.offset_y / 100 + "rem;\n" +
                            "background-size: " + sprite.total_width / 100 + "rem " + (sprite.total_height+3) / 100 +"rem;\n" +
                            "display: inline-block;" +
                            "width: " + (sprite.width+5) / 100 + "rem;\n" +
                            "height: " + (sprite.height+5) / 100 + "rem;\n" +
                            "}\n");
                    });
                    return arr.join('');
                }
            }));
        spriteData.img.pipe(gulp.dest(pathM.dest + 'img/sprite/'));
        spriteData.css.pipe(gulp.dest(pathM.dev + 'sass/mod/'));
    });
}
spriteFun('png');


//font
// gulp.task('font', function(){
//     return gulp.src([path.dev + 'font/*.eot', path.dev + 'font/*.svg', path.dev + 'font/*.ttf', path.dev + 'font/*.woff'])
//         .pipe(gulp.dest(path.dest + 'font/'));
// });

// clean(删除文件及文件夹)
gulp.task('cleanCss', function() {
	gulp.src([
			path.dest + 'css/*.css'
		])
		.pipe(clean({force: true}));
});

// watch
gulp.task('watch',function(){
   	gulp.watch(path.dev + 'sass/**', ['style']); //css文件监听
       gulp.watch(path.dev + 'img/sprite/*.png', ['spritepng']);
    // gulp.watch(path.dev + 'img/default/**', ['defaultImg']); //图片文件监听
    // gulp.watch(path.dev + 'img/sprite_png/*.png', ['spritepng']);
    // gulp.watch(path.dev + 'font/*', ['font']);
    // gulp.watch(path.dev + 'js/*', ['a','common']);//js文件监听
    // gulp.watch(path.dev + 'js/*', ['scroll-view','calendar-cncn']);//js文件监听
});
gulp.task('default', ['watch']);

