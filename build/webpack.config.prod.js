/**
 *
 *  生产环境配置文件
 *
 */
var webpack = require('webpack')
var path = require('path')
var config = require('../config/index')
var baseConfig = require('./webpack.config.base')
var merge = require('webpack-merge')

var webpackConfig = {
  plugins: [
    //压缩js文件
    new webpack.optimize.UglifyJsPlugin({
      warnings: false
    }),
    //给常用的模块或chunk指定更短的id，从而减少整体文件大小
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}

module.exports = merge(baseConfig, webpackConfig)
