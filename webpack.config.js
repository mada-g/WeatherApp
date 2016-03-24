var path    = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
/*
['webpack-dev-server/client?http://127.0.0.1:8080',
'webpack/hot/only-dev-server']
*/
module.exports = {

  entry: [
    //'webpack-dev-server/client?http://127.0.0.1:8080',
    //'webpack/hot/only-dev-server',
    './client'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'app.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions:         ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader")
      }
    ]
  },
  postcss: function(){
    return [autoprefixer];
  },
  plugins: [
    new ExtractTextPlugin('appStyle.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        }
      })
  ],
  //devtool: 'source-map',
  devtool: 'eval',
  devServer: {
    contentBase: './public',
    hot: true,
    headers: {"Access-Control-Allow-Origin": "*"},
  }
};
