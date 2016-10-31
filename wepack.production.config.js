const PORT = process.env.PORT || 7000;
const path = require('path');
const webpack = require('webpack');

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
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
				screw_ie8: true
			}
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	],
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
