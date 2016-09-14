// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

var path = require('path')

module.exports = {
  devtool: 'source-map',
  plugins: [
    // your custom plugins
  ],
  resolve: {
    modulesDirectories: [
      path.join(__dirname, '../node_modules'),
      path.join(__dirname, '../app/node_modules')
    ],
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ],
  },
};
