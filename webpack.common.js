const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	plugins: [
	new HtmlWebpackPlugin({ template: "index.html", inject: "body", type: "module" }),
    new CleanWebpackPlugin({
		protectWebpackAssets: false,
		cleanAfterEveryBuildPatterns: ['*.LICENSE.txt'],
	  }),
	],
	resolve: { extensions: [".ts", ".js"] },
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: '/node_modules/'
			},
			{
				test: /\.(png|jpg|gif|wav)$/i,
				type: "asset/resource",
			},
			{
				test: /\.glsl$/i,
				use: "raw-loader"
			}
		]
	}
};