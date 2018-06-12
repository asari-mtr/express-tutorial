var nodeExternals = require('webpack-node-externals');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.pug$/,
        loader: ["raw-loader", "pug-loader"]
      }
    ]
  },
  externals: [nodeExternals()],
  node: {
    __dirname: false,
    __filename: true
  },
  target: "node"
}
