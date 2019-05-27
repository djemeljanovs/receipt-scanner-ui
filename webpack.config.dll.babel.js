import path from 'path';
import webpack from 'webpack';

import ProgressBarWebpackPlugin from 'progress-bar-webpack-plugin';

const reactReduxVendors = [
    'react',
    'react-dom',
    'react-redux',
    'redux',
    'redux-actions',
    'redux-saga',
    'reselect',
    'immutability-helper',
];

const fortAwesomeVendors = [
  '@fortawesome/fontawesome-svg-core',
  '@fortawesome/react-fontawesome',
];

export default {
    mode: process.env.NODE_ENV,
    context: path.resolve(__dirname),
    entry: {
        reactRedux: reactReduxVendors,
        fortAwesome: fortAwesomeVendors,
    },
    output: {
        path: path.resolve(__dirname, 'dist/dll/'),
        filename: '[name]_dll.js',
        library: '[name]_dll',
    },
    plugins: [
        new ProgressBarWebpackPlugin(),
        // Output manifest json file for each generated dll reference file
        new webpack.DllPlugin({
            path: path.resolve(__dirname, 'dist/dll/[name]_manifest.json'),
            name: '[name]_dll',
        }),
    ],

    // Turn off performance hints (assets size limit)
    performance: {
        hints: false,
    },
};
