module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: __dirname,
    publicPath: "/",
    filename: "bundle.js",
  },

  devServer: {
    // Set proxy so /api goes to the node server
    proxy: {
      "/api": {
        target: "https://afternoon-stream-77228.herokuapp.com",
        secure: false,
        changeOrigin: true,
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true,
            },
          },
        ],
      },
    ],
  },
};
