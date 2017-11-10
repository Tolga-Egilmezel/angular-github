const webpack = require('webpack');
const path = require('path');
const ExtractText = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = './src';
const output = './build';

module.exports = () => {
    return {
        context: path.resolve(__dirname, entry),
        entry: {
            vendor: './vendor.ts',
            polyfills: './polyfills.ts',
            main: './main.ts',
        },
        output: {
            path: path.join(__dirname, output),
            filename: '[name].min.js',
            publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
            "hotUpdateMainFilename": 'hot/hot-update.json'
        },
        resolve: {
            extensions: ['.js', '.ts', '.html', 'scss', 'css'],
            alias: {
              'css': path.resolve(__dirname, entry + '/assets/css'),
              'scss': path.resolve(__dirname, entry + '/assets/scss'),
            }
        },
        module: {
            rules: [
                {
                    "test": /\.scss$/,
                    "exclude": "/node_modules/",
                    "loader": 'raw-loader!postcss-loader!sass-loader'
                },
                {
                    "test": /\.(css|sass|scss)$/,
                    "use": ExtractText.extract(['css-loader?importLoaders=2?sourceMap=true!postcss-loader?sourceMap=true!sass-loader?sourceMap=true'])
                },
                {
                    test: /\.ts$/,
                    loaders: [
                        'awesome-typescript-loader',
                        'angular2-template-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader'
                }
            ]
        },
        plugins: [
          new webpack.DefinePlugin({
              'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
          }),
          new ExtractText({ 'filename': 'main.min.css', 'allChunks': true }),
          new webpack.optimize.CommonsChunkPlugin({
              'name': ['main', 'polyfills', 'vendor']
          }),
          new webpack.ContextReplacementPlugin(
              /(.+)?angular(\\|\/)core(.+)?/,
              path.resolve(entry),
              {}
          ),
          new HtmlWebpackPlugin({
              'filename': 'index.html',
              'template': '../index.html',
              'inject': true,
          }),
        ],
        devServer: {
          contentBase: path.resolve(__dirname, output),
          port: 3000
        },
        cache: true
    };
};


if (process.env.NODE_ENV != 'production') {
  module.exports.devtool = '#source-map';
}
