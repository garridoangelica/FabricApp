const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const path = require('path');

console.log('==================== CatalogIQ Build ====================');
console.log('WORKLOAD_NAME:', process.env.WORKLOAD_NAME);
console.log('WORKLOAD_BE_URL:', process.env.WORKLOAD_BE_URL);
console.log('=========================================================');

module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        filename: 'bundle.[fullhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(),
        new Webpack.DefinePlugin({
            'process.env.WORKLOAD_NAME': JSON.stringify(process.env.WORKLOAD_NAME),
            'process.env.WORKLOAD_BE_URL': JSON.stringify(process.env.WORKLOAD_BE_URL),
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    context: './src/internalAssets/',
                    from: '**/*',
                    to: './internalAssets',
                    noErrorOnMissing: true,
                },
            ],
        }),
    ],
    resolve: {
        modules: [__dirname, 'src', 'node_modules'],
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    devServer: {
        port: 60006,
        open: false,
        historyApiFallback: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,OPTIONS',
            'Access-Control-Allow-Headers': '*',
        },
        setupMiddlewares: function (middlewares, devServer) {
            console.log('CatalogIQ dev server listening on port 60006');
            devServer.app.get('/manifests_new/metadata', function (req, res) {
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                });
                const devParameters = {
                    name: process.env.WORKLOAD_NAME,
                    url: 'http://127.0.0.1:60006',
                    devAADAppConfig: {
                        audience: process.env.DEV_AAD_CONFIG_AUDIENCE,
                        appId: process.env.DEV_AAD_CONFIG_APPID,
                        redirectUri: process.env.DEV_AAD_CONFIG_REDIRECT_URI,
                    },
                };
                res.end(JSON.stringify({ extension: devParameters }));
            });
            return middlewares;
        },
    },
};
