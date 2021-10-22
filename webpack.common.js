const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/i,
                use: [{loader: MiniCssExtractPlugin.loader}, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(svg)$/i,
                type: 'asset/source',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: devMode ? '[name].js' : '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            favicon: 'src/images/favicon.png',
            template: 'src/index.html',
            templateParameters: {
                basePublicUrl: process.env.BASE_PUBLIC_URL || 'http://localhost:8080',
            },
            title: 'Web3 - Serverless Days 2021',
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[contenthash].css',
        }),
        new webpack.EnvironmentPlugin({
            NODE_ENV: process.env.NODE_ENV || 'development',
            RPC_NETWORK: process.env.RPC_NETWORK || 'ropsten',
        }),
    ],
};
