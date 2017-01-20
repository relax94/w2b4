var webpack = require('webpack');

const AssetsPlugin = require('assets-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const webpackMergeDll = webpackMerge.strategy({ plugins: 'replace' });
const helpers = require('./helpers');

const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const autoprefixer = require('autoprefixer');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');

module.exports = {
    entry: {
        polyfills: './src/polyfills.ts',
        main: './src/boot.ts'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss'],
        modules: ['./src', './node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['awesome-typescript-loader?{configFileName: "tsconfig.webpack.config.json"}',
                    'angular2-template-loader',],
                exclude: [/node_modules\/(?!(ng2-.+))/]
            },

            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                loaders: ['to-string-loader', 'css-loader', 'sass-loader'],
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            // For bootstrap 4
            { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },
            {
                test: /\.html$/,
                use: 'raw-loader',
                exclude: './index.html'
            },

        ]
    },
    output: {

        path: './dist',
        filename: '[name].bundle.js',
        sourceMapFilename: '[file].map',
        library: 'ac_[name]',
        libraryTarget: 'var',
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Tether: "tether",
            "window.Tether": "tether",
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Util: "exports-loader?Util!bootstrap/js/dist/util"
        }),
    ]
    // postcss: function () {
    //     return [
    //         require('postcss-flexbugs-fixes'),
    //         require('autoprefixer')({ browsers: autoprefixerBrowsers })
    //     ];
    // }
};