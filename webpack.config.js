const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const appTitle = '懒盘搜索聚合官网 - lzpan.com'
module.exports = {
    mode: "development",
    entry: {
        index: path.resolve(__dirname, 'main.js'),
        mobile: path.resolve(__dirname, 'mobileMain.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
        chunkFilename: "[name].chunk.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,//排除掉node_module目录
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'] //转码规则
                    }
                }
            },
            {
                test: /\.(scss|css)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: appTitle,
            chunks: ['index'],
            filename: 'index.html',
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new HtmlWebpackPlugin({
            title: appTitle,
            chunks: ['mobile'],
            filename: 'mobile.html',
            template: path.resolve(__dirname, 'public/mobile.html')
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon'),
                    to: path.resolve(__dirname, 'dist')
                },
                {
                    from: path.resolve(__dirname, 'public/ads.txt'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
        }),
    ],
    devServer: {
        port: 3000,
        open: true
    }
}