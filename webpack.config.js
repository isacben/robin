const { join, resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  optimization: {
    minimize: true,
    minimizer: [
        new TerserPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.png/,
        type: 'asset/resource',
      }
    ],
  },
  resolve: { 
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: "body"
    }),
  ],
  devServer: {
    static: "./dist",
    compress: true,
    port: 3000,
  },
}
