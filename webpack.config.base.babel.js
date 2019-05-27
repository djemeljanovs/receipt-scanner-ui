import path from 'path';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import DuplicatePackageCheckerPlugin from "duplicate-package-checker-webpack-plugin";
import ProgressBarWebpackPlugin from "progress-bar-webpack-plugin";
import { DllReferencePlugin } from "webpack";

import cssnano from "cssnano";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import postcssImport from "postcss-import";
import postcssPresetEnv from "postcss-preset-env";

const ReactReduxManifest = './dist/dll/reactRedux_manifest.json';
const FortAwesomeManifest = './dist/dll/fortAwesome_manifest.json';

const devMode = process.env.NODE_ENV !== 'production';

export default {
    context: path.resolve(__dirname),
    target: "web",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    { loader: 'babel-loader' },
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useBabel: true,
                            useCache: true,
                            silent: true,
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: !devMode,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: () => [postcssImport, postcssPresetEnv, cssnano],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|tiff)(\?.*)?$/,
                use: [
                    { loader: 'url-loader', options: { limit: 10000, name: '[name].[hash:7].[ext]' } },
                    { loader: 'image-webpack-loader', options: { disable: devMode } },
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            },
        ]
    },
    plugins: [
        new ProgressBarWebpackPlugin(),
        new DuplicatePackageCheckerPlugin(),
        new DllReferencePlugin({ manifest: ReactReduxManifest }),
        new DllReferencePlugin({ manifest: FortAwesomeManifest }),
        // Extract css part from javascript bundle into separated file
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash:10].css',
            chunkFilename: '[name].[contenthash:10].css',
        }),
        // Better building progress display
        new ProgressBarWebpackPlugin(),
        // Generate html file to dist folder
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        // Add dll reference files to html
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'dist/dll/*_dll.js'),
            includeSourcemap: false,
        }),
        // Copy static files to build dir
        new CopyWebpackPlugin([
            {
                from: 'public/**/*',
                to: '[name].[ext]',
                ignore: ['index.html'],
            },
        ]),
    ],

    // Change how modules are resolved
    resolve: {
        // What directories should be searched when resolving modules
        modules: [
            'node_modules',
            'src',
        ],
        // Automatically resolve certain extensions (Ex. import 'folder/name(.ext)')
        extensions: [
            '.ts',
            '.tsx',
            '.js',
            '.jsx',
            '.json',
            '.css',
            '.scss',
            '.mjs',
        ],
    },
}
