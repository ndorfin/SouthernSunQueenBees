// Dependencies
const webpack              = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NameAllModulesPlugin = require('name-all-modules-plugin');

// Configuration
const baseConfig = require('./webpack.base.config');
const styleLoaders = require('./webpack.style.config');
const fontLoaders = require('./webpack.fonts.config');
const PATHS = require('./paths');
const ENVIRONMENT = require('./environment');

// Start off with the baseConfig
let serverConfig = baseConfig;

serverConfig.mode = 'development';

// Then extend the baseConfig
serverConfig.devServer = {
  contentBase: PATHS.BUILD,
  hot: true
};

serverConfig.module = {
  rules: [
    fontLoaders,
    styleLoaders.css,
    styleLoaders.scss,
  ]
};

serverConfig.output = {
  path: PATHS.DIST_JS,
  filename: '[name].js'
};

serverConfig.plugins = [

  // Output the name of modules during HMR/Dev
  // See: https://webpack.js.org/plugins/named-modules-plugin/
  new webpack.NamedModulesPlugin(),

  // Gives each module a name for good caching
  new NameAllModulesPlugin(),

  // Extracts CSS files from bundles
  new MiniCssExtractPlugin({
    filename: '../css/[name].css',
  }),

  new webpack.HotModuleReplacementPlugin()
];

module.exports = serverConfig;
