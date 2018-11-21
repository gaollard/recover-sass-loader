const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');

const YMU_CUSTOME = path.resolve(__dirname, 'src/custome-vars.scss')

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
          'sass-loader',
          {
            loader: './recover-sass-loader',
            options: {
              sassFile: 'vars.scss',
              loadCoverSassFile: () => {
                return YMU_CUSTOME
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