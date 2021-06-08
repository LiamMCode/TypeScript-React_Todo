// const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const HmtlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
//   mode: 'development',
//   devtool: 'inline-source-map',
//   entry: './public/index.tsx',

//   resolve: {
//     extensions: ['.ts', '.tsx', '.js', '.jsx'], 
//   },
//   devServer: {
//     contentBase: './dist'
//   },
//   plugins: [
//     new HmtlWebpackPlugin({
//         title: 'Development',
//         template: './public/index.html'
//     }),
//     new MiniCssExtractPlugin()
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx|ts|tsx)$/, //loader: 'ts-loader', 
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             cacheDirectory: true,
//             cacheCompression: false,
//           }
//         }
//       },
//       {
//         test: /\.css$/i,
//         use: [MiniCssExtractPlugin.loader, 'css-loader']
//       },
//     ]
//   },
//   output: {
//     filename: '[name].app.js',
//     path: path.resolve(__dirname, 'dist'),
//     clean: true, 
//     publicPath: "/"
//   },
// }

//REMEMBER TO RUN NPXwEBPACK
const path = require('path');
const HmtlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    //Mode the project is in
    mode: 'development',
    //Main Entry point
    entry: './src/index.tsx',

    // entry: {
    //     //these are names for the bundles and where to point to
    //     index: './src/index.js',
    //     print: './src/print.js'
    //     //anything here: 'what to bundle'
    // },

    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },

    optimization: {
        runtimeChunk: 'single',
    },

    plugins: [
        new HmtlWebpackPlugin({
            title: 'Development',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        cacheCompression: false,
                    }
              }
            },
            {
              test: /\.css$/,
              use: [MiniCssExtractPlugin.loader, 'css-loader']
          },
        ],
    },

    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },

    //Match output made by npx webpack
    output: {
        //change this if you want to
        filename: '[name].[contenthash].js',
        //path to the filename above
        path: path.resolve(__dirname, 'dist'),
        //use this to remove old build files
        clean: true,
        //public path to ensure it serves to '/'
        publicPath: '/',
    },
};