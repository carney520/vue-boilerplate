/**
 *
 *  开发环境配置文件
 *
 */
var webpack = require('webpack')
var path = require('path')
var config = require('../config/index')
var baseConfig = require('./webpack.config.base')
var merge = require('webpack-merge')

var webpackConfig = {
  devtool: 'eval-source-map',
  devServer: {
    contentBase: config.env.dist,
    hot: true,
    proxy: {
      "/api/*": {
        target: 'http://localhost:3000',
        secure: false,
      }
    }
  }
}

module.exports = merge(baseConfig, webpackConfig)
