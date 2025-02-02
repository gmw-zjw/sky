const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config')
const theme = require('../package.json').theme
const serverConfig = {
    entry:  path.resolve(__dirname, '../app/server/index.js'),
    output: {
        path: path.resolve(__dirname, '../server-bundle'),
        filename: 'root.server.js',
        publicPath: '/static/'
    },
    mode: 'development',
    target: "node",
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'isomorphic-style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' },
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: theme,
                            javascriptEnabled: true
                        }
                    },
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'isomorphic-style-loader',
                    'css-loader',
                    'postcss-loader'
                ],
            }

        ]
    }

}
module.exports = merge(baseConfig, serverConfig)
