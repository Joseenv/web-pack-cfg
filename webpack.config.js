const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");



module.exports = {
    mode: 'development', //modo desarrollador

    output: {
        clean: true //para que limpie cada que haga el build
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
            }

        ]
    },
    optimization: {

    },
    plugins: [
        new HtmlWebPack({
            filename: 'index.html',
            template: './src/index.html' //para que se guie de este archivo html
        }),
        new MiniCssExtract({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' }
            ]
        })
    ]
}