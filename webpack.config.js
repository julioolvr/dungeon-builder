const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

module.exports = {
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.png$/,
        use: [{ loader: 'file-loader' }]
      },
      {
        test: /\/src\/.*\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new FlowBabelWebpackPlugin(),
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{ from: 'src/lib/phaser.js' }]),
    new HtmlWebpackPlugin({
      title: 'Dungeon Builder',
      template: 'src/index.ejs'
    })
  ]
};
