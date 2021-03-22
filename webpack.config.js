const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: [
            path.resolve(__dirname, './index.ts'),
            path.resolve(__dirname, './styles.css'),
        ]
    },
    devtool: 'source-map',
    optimization: {
        moduleIds: 'named',
        splitChunks: {
            chunks: 'all'
        },
        minimize: false
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css'],
        alias: {
            "@core": path.resolve(__dirname, './src/core'),
            "@modules": path.resolve(__dirname, './src/modules'),
        }
    },
    plugins: [
        new Webpack.ProvidePlugin({
            parse: [path.resolve(__dirname, './src/core/engine/Engine'), 'Engine', 'parse'],
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `[name].css`
        }),
        new HtmlWebpackPlugin({
            title: 'webpack-typescript-boilerplate'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                include: [
                    path.resolve(__dirname, './index'),
                    path.resolve(__dirname, './src'),
                    path.resolve(__dirname, './src/core'),
                    path.resolve(__dirname, './src/modules')
                ],
                loader: 'ts-loader'
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, './styles.css'),
                ],
                use: [ MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    }
}
