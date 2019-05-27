import path from 'path';
import merge from 'webpack-merge';
import BaseWebpackConfig from './webpack.config.base.babel';

export default merge(BaseWebpackConfig, {
    mode: 'development',

    // The point or points to enter the application.
    entry: {
        app: './src/index.tsx',
    },

    // Affecting the output of the compilation
    output: {
        // path: the output directory as an absolute path (required)
        path: path.resolve(__dirname, 'dist/dev'),
        // filename: specifies the name of entry output file (required)
        filename: '[name].[hash:10].js',
        // chunkFilename: specifies the name of non-entry output files (e.g. dynamic import component)
        chunkFilename: '[name].[hash:10].js',
    },

    devServer: {
        // Port number for webpack dev server
        port: 3004,
        // Add proxy for api call
        proxy: {
            '/api': {
                target: 'http://0.0.0.0:5000/',
                secure: false,
                changeOrigin: true,
            },
        },
        // Automatically open page
        open: true,
        historyApiFallback: true,
    },

    devtool: 'inline-source-map',
});
