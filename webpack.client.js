const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const dirname = path.resolve("./");

const vendoModules = [
			"jQuery"
]

function createClientConfig(isDebug) {
	const devTool = isDebug ? "eval-source-map" : "source-map";
	const cssLoader = { test: /\.css$/, loader: ["style-loader", "css-loader"]};
	const sassLoader = { test: /\.scss$/, loader: ["style-loader", "css-loader", "sass-loader"]}
	const appEntry = ["./src/client/scripts/main.js"];
	const plugins = [];

	if(!isDebug) {
		plugins.push(new webpack.optimize.UglifyJsPlugin());
		plugins.push(new ExtractTextPlugin("styles.css"));

		cssLoader.loader = ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader"});
		sassLoader.loader = ExtractTextPlugin.extract({ fallback: "style-loader", use: ["css-loader", "sass-loader"]});
	}else {
		plugins.push(new webpack.HotModuleReplacementPlugin());
		appEntry.splice(0, 0, "webpack-hot-middleware/client");
	}

	return {
		devtool: devTool,
		plugins: plugins,
		entry: {
			main: appEntry
		},
		output: {
			path: path.join(dirname, "public", "build"),
			publicPath: "/build/",
			filename: "bundle.js"
		},
		module: {
			loaders: [
				{ test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
				{ test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/, loader: "url-loader?limit=1024" },
				cssLoader,
				sassLoader
			]
		}
	}

}

module.exports = createClientConfig(true);
module.exports.create = createClientConfig;
