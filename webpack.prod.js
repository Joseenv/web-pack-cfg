const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const Terser = require("terser-webpack-plugin");


module.exports = {
    mode: 'production', //modo desarrollador

    output: {
        clean: true,
        filename: 'main.[contenthash].js' //para que limpie cada que haga el build
    },

    module: {
        rules: [

            {
                test: /\.html$/i, // para que busque archivos html y los lleve al dist
                loader: "html-loader",
                options: {
                    sources: false
                }
            },
            
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: ["style-loader", "css-loader"]
            },

            {
                test: /styles\.css$/i,
                use: [ MiniCssExtract.loader, "css-loader" ]
            },

            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader'
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }

        ]
    },

    optimization: {

        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser()
        ]
    },

    plugins: [
        new HtmlWebPack({
            filename: 'index.html',
            template: './src/index.html' //para que se guie de este archivo html
        }),
        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]
}