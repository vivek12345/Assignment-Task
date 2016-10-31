const PORT = process.env.PORT || 7000;
const path = require('path');

const publicPath = `http://localhost:${PORT}/dist/`;

module.exports = {
	entry: {
		index: './src/js/index.js'
	},
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'dist'),
		publicPath: publicPath
	},
	module: {
		loaders: [{
			exclude: /node_modules/,
			loader: 'babel-loader',
		}]
	},
	devtool: '#source-map',
	resolve: {
		extensions: ['','.jsx','.js']
	},
	devServer: {
		port: PORT,
		inline: true,
		hot: false,
		contentBase: './src'
	}
}
