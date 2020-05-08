const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 模式: 生产环境
  mode: 'production',
  // 入口
  entry: {
    app: path.resolve(__dirname, 'src/index.js')
  },
  // 出口(打包生成js)
  output: {
    filename: 'static/js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 模块加载器
  //wabpack本身只打包js和json, 在module中可以打包其他的文件:图片等
  module: {
    rules: [
      //用来打包js
      {
        test: /\.js$/,
        //exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      //用来打包css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // 多个loader从右到左处理
      },
      //用来打包图片
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: 'static/img/[name].[hash:7].[ext]' // 相对于output.path
        }
      },


    ]
  },
   

  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html', //把那个页面作为模板页面处理
      filename: 'index.html'  // 生成页面(在output指定的path下)
    })
  ],
  devServer: {
    open: true, // 自动打开浏览器
    quiet: false, // 不做太多日志输出,日志中会可能显示你的一些错误
  },   
  //方便我调试代码
  devtool: 'cheap-module-eval-source-map',

}