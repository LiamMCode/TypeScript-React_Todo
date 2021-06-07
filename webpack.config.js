module.exports = {
    devtool: 'inline-source-map',
    entry: './public/scripts/App.js',
    output: {
      path: __dirname + '/src',
      filename: './public/index.html'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'], 
    },
    module: {
      rules: [
        {test: /\.tsx?$/, loader: 'ts-loader'}
      ]
    }
  }