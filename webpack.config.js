
module.exports = {
  output: {
    path: __dirname,
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'TreeView'
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [
          'babel-loader',
          'eslint-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  externals: {
    'React': 'react'
  }
};