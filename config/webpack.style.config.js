const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const postCSSConfig = require('./postcss.config');

const styleLoaders = {
  css: {
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
  scss: {
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
}

module.exports = styleLoaders;
