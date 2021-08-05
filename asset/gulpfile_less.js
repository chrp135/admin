const { src, dest,watch, series } = require('gulp')

const path = require('path')


const cleanCss = require('gulp-clean-css')
const less = require('gulp-less')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const autoprefixer = require('gulp-autoprefixer'); //补全浏览器前缀


devUrl = path.join(__dirname + '/dev/')
outputUrl = path.join(__dirname, '../static/')

// less 保险h5
function lessInsurance() {
    return src(devUrl + 'less/insurance.less')
        .pipe(less())
        .pipe(autoprefixer({
			browsers: ['last 20 versions']
        }))
        .pipe(concat('insurance.css'))
        .pipe(cleanCss({
            compatibility: "ie8"
        }))
        .pipe(dest(outputUrl + 'css'))
}

function jsInsurance() {
    return src([devUrl + 'js/jquery-3.5.1.min.js', devUrl + 'js/layer/layer_mobile.js', devUrl + 'js/mod/art-template.js', devUrl + 'js/mod/mobileSelect.js', devUrl + 'js/mod/selectDate.js', devUrl + 'js/mod/common.js',])
        .pipe(concat('insurance.js'))
        .pipe(uglify())
        .pipe(dest(outputUrl + 'js'))
}

// 分销商PC后台框架
function handleAdmin() {
    return src(devUrl + 'less/admin.less')
        .pipe(less())
        .pipe(concat('admin.css'))
        .pipe(cleanCss({
            compatibility: "ie8"
        }))
        .pipe(dest(outputUrl + 'css'))
}

// 分销商PC后台框架iframeWarp
function handleIframeWrap() {
    return src(devUrl + 'less/iframeWrap.less')
        .pipe(less())
        .pipe(concat('iframeWrap.css'))
        .pipe(cleanCss({
            compatibility: "ie8"
        }))
        .pipe(dest(outputUrl + 'css'))
}

// 分销商PC后台登录
function handleLogin() {
    return src(devUrl + 'less/login.less')
        .pipe(less())
        .pipe(concat('login.css'))
        .pipe(cleanCss({
            compatibility: "ie8"
        }))
        .pipe(dest(outputUrl + 'css'))
}

// images
function handleImage() {
    return src(devUrl + 'image/**')
    .pipe()
}


function watchFun() {
    return watch(devUrl, series(handleAdmin,handleIframeWrap))
    // return watch(devUrl, series(handleIframeWrap))
    // return watch(devUrl, series(handleLogin))
}



exports.default = watchFun