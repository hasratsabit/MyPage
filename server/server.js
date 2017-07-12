/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _path = __webpack_require__(1);

var _path2 = _interopRequireDefault(_path);

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = __webpack_require__(5);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressHandlebars = __webpack_require__(6);

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _index = __webpack_require__(7);

var _index2 = _interopRequireDefault(_index);

var _chalk = __webpack_require__(10);

var _chalk2 = _interopRequireDefault(_chalk);

var _socket = __webpack_require__(11);

var _socket2 = _interopRequireDefault(_socket);

var _http = __webpack_require__(12);

var _http2 = _interopRequireDefault(_http);

var _database = __webpack_require__(13);

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

_mongoose2.default.connect(_database2.default.database);
var db = _mongoose2.default.connection;
db.once('open', function () {
	console.log('Connected to mongoose');
});

// Client Webpack
if (process.env.USE_WEBPACK === "true") {
	var webpackMiddleware = __webpack_require__(14),
	    webpackHotMiddlware = __webpack_require__(15),
	    webpack = __webpack_require__(3),
	    clientConfig = __webpack_require__(16).create(true);

	var compiler = webpack(clientConfig);
	app.use(webpackMiddleware(compiler, {
		publicPath: "/assets/",
		stats: {
			colors: true,
			chunks: false,
			assets: false,
			timings: false,
			modules: false,
			hash: false,
			version: false
		}
	}));
	app.use(webpackHotMiddlware(compiler));
	console.log(_chalk2.default.bgRed("Using WebPack Dev Middleware! THIS IS FOR DEV ONLY!"));
}

// Template Engine
app.engine(".hbs", (0, _expressHandlebars2.default)({ defaultLayout: "layout", extname: ".hbs" }));
app.set('view engine', 'hbs');
app.use(_express2.default.static(_path2.default.join("public")));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use("/", _index2.default);

app.use(function (req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

var port = process.env.port || 3000;
app.listen(port, function () {
	console.log("Running on port " + port);
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("express-handlebars");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _blog = __webpack_require__(8);

var _blog2 = _interopRequireDefault(_blog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get("/", function (req, res, next) {
	res.render("index", { title: "Hasrat Sabit", message: "Welcome" });
});

router.use('/blog', _blog2.default);
module.exports = router;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _blog = __webpack_require__(9);

var _blog2 = _interopRequireDefault(_blog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
	_blog2.default.find(function (err, blogs) {
		if (err) {
			console.log(err);
			return;
		} else {
			res.render('blog/blog', {
				title: 'Blogs',
				blog: blogs
			});
		}
	});
});

router.post('/post-blog', function (req, res) {
	var blog = new _blog2.default();
	blog.title = req.body.title;
	blog.image = req.body.image;
	blog.content = req.body.content;

	blog.save(function (err) {
		if (err) {
			console.log(err);
			return;
		} else {
			res.redirect('/');
		}
	});
});

router.get('/post-blog', function (req, res) {
	res.render('blog/add-blog', { title: 'ADD BLOG' });
});

router.get('/view-all-blogs', function (req, res) {
	res.render('blog/view-all-blogs', { title: 'View all blogs' });
});

module.exports = router;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var BlogSchema = new Schema({
	title: String,
	author: String,
	postDate: Date,
	content: String,
	category: String,
	comment: String,
	commentNum: Number,
	shared: Number,
	liked: String,
	image: String
});

var Blog = _mongoose2.default.model('Blog', BlogSchema);
module.exports = Blog;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("socket.io");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	database: 'mongodb://localhost:27017/myPage',
	secret: 'yoursecret'
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var path = __webpack_require__(1);
var webpack = __webpack_require__(3);
var ExtractTextPlugin = __webpack_require__(17);
var OptimizeCssAssetsPlugin = __webpack_require__(18);
var ImageminPlugin = __webpack_require__(19).default;
var CopyWebpackPlugin = __webpack_require__(20);
var dirname = path.resolve("./");
var HtmlPlugin = __webpack_require__(21);

function createClientConfig(isDev) {

	var sassDev = ['style-loader', 'css-loader', 'sass-loader'];
	var sassProd = ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: ['css-loader', 'sass-loader']
	});

	var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
	var cssProd = ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: ['css-loader']
	});

	var cssLoader = isDev ? cssDev : cssProd;
	var sassLoader = isDev ? sassDev : sassProd;

	var appEntry = ["./src/client/scripts/main.js"];
	var plugins = isDev ? [new webpack.optimize.CommonsChunkPlugin("vendors"), new webpack.HotModuleReplacementPlugin(), new HtmlPlugin({
		template: 'views/index.hbs'
	})] : [new webpack.optimize.UglifyJsPlugin(), new ExtractTextPlugin({ filename: "styles.css" }), new OptimizeCssAssetsPlugin({
		assetNameRegExp: /.css$/,
		cssProcessor: __webpack_require__(22),
		cssProcessorOptions: { discardComments: { removeAll: true } },
		canPrint: true
	})];
	if (isDev) {
		appEntry.splice(0, 0, "webpack-hot-middleware/client");
	}

	return {
		devtool: "source-map",
		plugins: plugins,
		entry: {
			bundle: appEntry,
			vendors: ['jquery']
		},
		output: {
			path: path.join(dirname, "public", "assets"),
			publicPath: "/assets/",
			filename: "[name].js"
		},
		resolve: {
			alias: {
				shared: path.join(dirname, "src", "shared")
			}
		},
		node: {
			dns: "mock",
			fs: "empty",
			path: true,
			url: false
		},
		module: {
			loaders: [{
				test: /\.js$/,
				use: "babel-loader",
				exclude: /node_modules/
			}, {
				test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/,
				loader: "file-loader?name=[name].[ext]&outputPath=images/",
				exclude: /node_modules/
			}, {
				test: /\.css$/,
				use: cssLoader,
				exclude: /node_modules/
			}, {
				test: /\.scss$/,
				use: sassLoader,
				exclude: /node_modules/
			}]
		}
	};
}

module.exports = createClientConfig(true);
module.exports.create = createClientConfig;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("extract-text-webpack-plugin");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("optimize-css-assets-webpack-plugin");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("imagemin-webpack-plugin");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("copy-webpack-plugin");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("html-webpack-plugin");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("cssnano");

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map