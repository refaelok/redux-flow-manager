const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	plugins: [
		{
			resolve: '@poi/plugin-typescript',
			options: {}
		}
	],
	configureWebpack: {
		resolve: {
			plugins: [
				new TsconfigPathsPlugin({})
			]
		}
	},
};