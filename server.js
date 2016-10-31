/* eslint no-console: 0 */
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const config = (process.env.NODE_ENV !== 'production')?require('./webpack.config.js'):require('./webpack.production.config.js');
const bodyParser = require('body-parser');


const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 7000 : process.env.PORT;
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // s

if (isDeveloping) {
	const compiler = webpack(config);
	app.use(express.static(__dirname + '/src'));
	const middleware = webpackMiddleware(compiler, {
		publicPath: config.output.publicPath,
		contentBase: './src',
		stats: {
			colors: true,
			hash: false,
			progress: true
		}
	});

	app.use(middleware);
	app.get('/', function response(req, res) {
		res.sendFile(path.join(__dirname, 'src/index.html'));
	});
} else {
	app.use(express.static(__dirname + '/dist'));
	app.get('*', function response(req, res) {
		res.sendFile(path.join(__dirname, 'dist/index.html'));
	});
}

app.listen(port, '0.0.0.0', function onStart(err) {
	if (err) {
		console.log(err);
	}
	console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
