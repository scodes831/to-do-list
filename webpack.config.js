const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: "development",
    watch: true,
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gift)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                type: 'asset/resource',
            },
        ],
    },
}