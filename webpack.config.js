var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'TreeView'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: ['babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react', 'eslint-loader' ],
        exclude: /node_modules/,

      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ],
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: './src/'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      exclude: [
        /node_modules\//
      ],
      compress: {warnings: false}
    })
  ],
  externals: {
    'React': 'react'
  }
};