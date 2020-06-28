const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	entry: './src/index.ts',
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
