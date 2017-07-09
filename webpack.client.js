const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const dirname = path.resolve("./");
const HtmlPlugin = require("html-webpack-plugin");


function createClientConfig(isDev) {

	const sassDev = ['style-loader', 'css-loader', 'sass-loader'];
	const sassProd = ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: ['css-loader', 'sass-loader']
	});

	const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
	const cssProd = ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: ['css-loader']
	});

	const cssLoader = isDev ? cssDev : cssProd;
	const sassLoader = isDev ? sassDev : sassProd;

	const appEntry = ["./src/client/scripts/main.js"];
	const plugins = isDev
				? [
						new webpack.optimize.CommonsChunkPlugin("vendors"),
						new webpack.HotModuleReplacementPlugin(),
						new HtmlPlugin({
							template: 'views/index.hbs'
						})
					]
				: [
						new webpack.optimize.UglifyJsPlugin(),
						new ExtractTextPlugin({filename: "styles.css"}),
						new OptimizeCssAssetsPlugin({
							assetNameRegExp: /.css$/,
							cssProcessor: require("cssnano"),
							cssProcessorOptions: { discardComments: {removeAll: true}},
							canPrint: true
						})
					]
	if(isDev){
		appEntry.splice(0, 0, "webpack-hot-middleware/client");
	}

	return {
		devtool: "source-map",
		plugins: plugins,
		entry: {
			bundle: appEntry,
			vendors: [
				'jquery'
			]
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
			loaders: [
				{
					test: /\.js$/,
					use: "babel-loader",
					exclude: /node_modules/
				},
				{
					test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/,
					loader: "file-loader?name=[name].[ext]&outputPath=images/",
					exclude: /node_modules/
				},
				{
					test: /\.css$/,
					use: cssLoader,
					exclude: /node_modules/
				},
				{
					test: /\.scss$/,
					use: sassLoader,
					exclude: /node_modules/
				},
			]
		}
	}

}

module.exports = createClientConfig(true);
module.exports.create = createClientConfig;
