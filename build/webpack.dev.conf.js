var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var projectRoot = path.resolve(__dirname, '../')


// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({
        sourceMap: config.dev.cssSourceMap,
        useStyleLoader: true
    })
  },
  // eval-source-map is faster for development
  // devtool: '#eval-source-map',
  //devtool: '#cheap-source-map',
  // inline-source-map is better for debug
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DllReferencePlugin({
        context: projectRoot,
        manifest: require(projectRoot + '/externals/manifest.json'),
    }),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,

      // 用来加载lib
      bundle: '<script src="/externals/lib.js"></script',
    }),
  ]
})
