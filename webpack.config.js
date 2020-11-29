const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: './extension/main',
    content: './extension/content',
    options: './extension/options',
  },
  output: {
    path: path.join(__dirname, 'extension/build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: '*',
        context: 'extension',
        ignore: [
          '*.js'
        ]
      },
      {
        from: 'style/*',
        context: 'extension'
      },
      {
        from: 'images/*',
        context: 'extension'
      },
      {
        from: 'webextension-polyfill/dist/browser-polyfill.min.js',
        context: 'node_modules'
      },
      {
        from: 'jquery/dist/jquery.slim.min.js',
        context: 'node_modules'
      }
    ])
  ]
};
