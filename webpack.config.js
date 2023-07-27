const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[name][ext][query]'
  },
  module:{
    rules:[
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },

        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        },
    ],
},
};