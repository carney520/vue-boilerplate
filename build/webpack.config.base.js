var webpack = require('webpack')
var path    = require('path')
var config  = require('../config/index')
var pkg     = require('../package.json')
var svgoConfig = require('../config/svgo.config.json')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: config.env.entry
  },
  output: {
    path: config.env.dist,
    filename: "[name].js",
    publicPath: config.env.publicPath
  },
  //模块查找
  resolve: {
    extensions: ['','.js','.vue'],
    //设置别名，这样就可以使用简短的require
    alias: {
      'src':        path.resolve(__dirname, '../src'),             //比如require('src/main.js')
      'assets':     path.resolve(__dirname,'../src/assets/'),      //静态资源目录
      'components': path.resolve(__dirname,'../src/components/'),  //组件目录
      'resources':   path.resolve(__dirname,'../src/resources/'),   //后台资源对象目录
    }
  },
  //模块加载器
  module: {
    preLoaders: [
      //svg icon
      {
        test: /\.svg$/,
        loader: 'svgo?' + JSON.stringify(svgoConfig),
        include: /assets\/icons/
      },
    ],
    loaders: [
      /******* vue ******/
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      //处理template，style中引入的静态文件
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url',
        query: {
          limit: 10000,                //小于10kb 转换为base64 data url
          name: '[name].[ext]?[hash]'  //文件名模板
        }
      },
      //svg icon
      {
        test: /\.svg$/,
        loader: 'svg-sprite',
        include: /assets\/icons/
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      //jade
      {
        test: /\.jade$/,
        loader: 'jade'
      }
    ],
  },
  //插件
  plugins: [
    //生成入口文件html
    new HtmlWebpackPlugin(
      {
        title: pkg.name,
        template: path.join(config.env.assets,'index.jade'),
        inject: 'body',
        hash: true,
        cache: true,
        //favicon: ''
      }
    ),
    new webpack.DefinePlugin({
      //定义环境变量
      'process.env': config.env === 'dev'
        ? require('../config/env.dev.js')
        : require('../config/env.prod.js')
    })
  ],
  // vue 配置
  vue: {
    loaders: {
      html: 'jade',          //默认使用jade 引擎,这样就不用指定lang="jade"
                             //js 使用默认的es6
      css: 'sass'
    }
  }
}
