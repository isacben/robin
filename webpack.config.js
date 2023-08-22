const { join, resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
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
