module.exports = {
    devtool: 'inline-source-map',
    entry: './src/scripts/App.tsx',
    output: {
      path: __dirname + '/public',
      filename: './src/scripts/app.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
      rules: [
        {test: /\.tsx?$/, loader: 'ts-loader'}
      ]
    }
  }