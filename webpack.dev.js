const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  entry: './examples/index.js',
  context: path.resolve(__dirname, '.'),
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    public: `localhost:${process.env.PORT || 8080}`,
    disableHostCheck: true,
    contentBase: './',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '@devanjs/log',
    }),
  ],
});