// Dependencies
const UglifyJSPlugin       = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Configuration
const baseConfig  = require('./webpack.base.config');
const styleLoaders = require('./webpack.style.config');
const fontLoaders = require('./webpack.fonts.config');
const PATHS       = require('./paths');
const ENVIRONMENT = require('./environment');

// Setup
let buildConfig = baseConfig;

buildConfig.mode = 'production';

buildConfig.output = {
  path: PATHS.DIST_JS,
  filename: '[name].js'
};

buildConfig.module = {
  rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: [
          ['es2015', { 'modules': false }]
        ]
      }
    },
    fontLoaders,
    styleLoaders.css,
    styleLoaders.scss,
  ]
};

buildConfig.plugins = [

  // Compress output
  new UglifyJSPlugin(),

  // Extracts CSS files from bundles
  new MiniCssExtractPlugin({
    filename: '../css/[name].css',
  }),
];

module.exports = buildConfig;
