const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    target: 'web', // HMR fix: https://github.com/webpack/webpack-dev-server/issues/2758#issuecomment-710086019
    devServer: {
        hot: true,
        port: 30000,
        static: {
            directory: './static',
        },
    },
});
