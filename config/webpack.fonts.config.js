const fontLoaders = {
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
}

module.exports = fontLoaders;
