// Dependencies
const UglifyJSPlugin       = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Configuration
const baseConfig  = require('./webpack.base.config');
const PATHS       = require('./paths');
const ENVIRONMENT = require('./environment');
const postCSSConfig = require('./postcss.config');

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
    {
      test: /\.(woff|woff2)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '../fonts/'
          }
        }
      ]
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader', // translates CSS into CommonJS. See: https://webpack.js.org/loaders/css-loader/
        {
          loader: 'postcss-loader',
          options: postCSSConfig
        },
        {
          // Resolves url() paths in SCSS files
          // See: https://github.com/bholloway/resolve-url-loader
          loader: 'resolve-url-loader'
        }
      ]
    },
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader', // translates CSS into CommonJS. See: https://webpack.js.org/loaders/css-loader/
        {
          loader: 'postcss-loader',
          options: postCSSConfig
        },
        {
          // Resolves url() paths in SCSS files
          // See: https://github.com/bholloway/resolve-url-loader
          loader: 'resolve-url-loader'
        },
        { // compiles Sass to CSS
          // See: https://webpack.js.org/loaders/sass-loader/
          loader: 'sass-loader'
        }
      ]
    }
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
