const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin")


module.exports = {
    entry: {
        main: path.join(__dirname, "src/index.js")
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /(node_modules)/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {loader: "css-loader", options: {importLoaders:1}},
                    "postcss-loader",
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from:'./src/assets/images/*',
                    to:'assets/images/[name].[ext]'
                },
                {
                    from:'./src/assets/pdf/*',
                    to:'assets/pdf/[name].[ext]'
                },
                {
                    from:'./src/assets/svg/*',
                    to:'assets/svg/[name].[ext]'
                }
            ],
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
        })
    ],
    stats: "minimal",
    devtool: "source-map",
    mode: "development",
    devServer: {
        open: false,
        contentBase: "./dist",
        inline: true,
        port: 4000
    }
};