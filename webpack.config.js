
module.exports = {
	entry: "./client/app.js",
	output:  {
		filename: "./out/index.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude:/(node_modules)/,
				loader: 'babel-loader',
				query: {
					presets: [
						'es2015',
						'react'
					]
				}
			}
		]
	}
};