const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'development',

	plugins: [
		new webpack.ProgressPlugin(),
	],

	target: 'node',

	output: {
		library: 'library',
		libraryTarget: 'umd',
	},

	entry: {
		main: './src/index.ts',
	},

	module: {
		rules: [
			{
				test: /.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},

	resolve: {
		extensions: ['.ts', '.js', '.txs']
	}
};
