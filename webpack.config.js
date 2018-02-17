const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

const config = {
  //Build a bundle for NodeJS not for browser
  target: "node",

  entry: "./server.js",

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/
      }
    ]
  },
  externals: [webpackNodeExternals()]
};

module.exports = config;
