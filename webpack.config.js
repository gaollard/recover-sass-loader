const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              beforeRender (renderOption) {
                const str = `@import 'vars.scss';\n`;
                const append = `@import 'yellow.scss';\n`;
                // const start = renderOption.data.search(str)
                renderOption.data = renderOption.data.replace(str, `${str}${append}`);
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}