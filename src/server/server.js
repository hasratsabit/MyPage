import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import index from "./routes/index";
import chalk from "chalk";
import socketIo from "socket.io";
import http from "http";
import expressHbs from "express-handlebars";

const app = express();


// Client Webpack
if (process.env.USE_WEBPACK === "true") {
	var webpackMiddleware = require("webpack-dev-middleware"),
		webpackHotMiddlware = require("webpack-hot-middleware"),
		webpack = require("webpack"),
		clientConfig = require("../../webpack.client").create(true);


	const compiler = webpack(clientConfig);
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
	console.log(chalk.bgRed("Using WebPack Dev Middleware! THIS IS FOR DEV ONLY!"));
}

// Template Engine
app.engine(".hbs", expressHbs({defaultLayout: "layout", extname: ".hbs"}));
app.set('view engine', 'hbs');
app.use(express.static(path.join("public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


app.use("/", index);

app.use((req, res, next) => {
	const err = new Error("Not Found")
	err.status = 404;
	next(err);
})


const port = process.env.port || 3000;
app.listen(port, () => {
	console.log(`Running on port ${port}`);
})
