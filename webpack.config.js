module.exports = {
    devtool: 'inline-source-map',
    entry: './public/scripts/App.js',
    output: {
      path: __dirname + '/public',
      filename: './public/index.html', 
      publicPath: "/"
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'], 
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/, //loader: 'ts-loader', 
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            }
          }
        }
      ]
    }
  }