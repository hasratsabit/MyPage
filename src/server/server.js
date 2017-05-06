import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import index from "./routes/index";
import chalk from "chalk";
import socketIo from "socket.io";
import http from "http";


const app = express();
const server = new http.Server(app);
const io = socketIo(server);

// Client Webpack
if (process.env.USE_WEBPACK === "true") {
	var webpackMiddleware = require("webpack-dev-middleware"),
		webpackHotMiddlware = require("webpack-hot-middleware"),
		webpack = require("webpack"),
		clientConfig = require("../../webpack.client").create(true);


	const compiler = webpack(clientConfig);
	app.use(webpackMiddleware(compiler, {
		publicPath: "/build/",
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

// app.engine(".hbs", exphbs({ defaultLayout: "layout", extname: ".hbs"}))
app.set("view engine", "jade");
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
function startServer() {
	server.listen(port, () => {
		console.log(`Started http server on ${port}`);
	})
}
startServer();
