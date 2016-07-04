var path = require('path')

module.exports = {
  env:    process.env.NODE_ENV | 'dev',                    //编译环境
  entry:  path.resolve(__dirname,'../src/main.js'),        //入口文件
  publicPath: '/',
  dist:   path.resolve(__dirname,'../dist'),               //输出目录
  assets: path.resolve(__dirname,'../src/assets'),         //资源文件
  static: 'static'
}

