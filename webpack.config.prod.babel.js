import path from 'path';
import merge from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import BaseWebpackConfig from './webpack.config.base.babel';


export default merge(BaseWebpackConfig, {

    mode: 'production',

    // The point or points to enter the application.
    entry: {
        app: './src/index.tsx',
    },

    // Affecting the output of the compilation
    output: {
        // path: the output directory as an absolute path (required)
        path: path.resolve(__dirname, 'dist/prod'),
        // filename: specifies the name of entry output file (required)
        filename: '[name].[chunkhash:10].js',
        // chunkFilename: specifies the name of non-entry output files (e.g. dynamic import component)
        chunkFilename: '[name].[chunkhash:10].js',
        // publicPath: specifies the server-relative URL of the output resource directory
        // https://webpack.js.org/configuration/output/#output-publicpath
        publicPath: './',
    },

    plugins: [
        new BundleAnalyzerPlugin(),
    ],

    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
            parallel: true,
            extractComments: 'all',
        })],
        usedExports: true,
        sideEffects: true,
    },
});