const path = require('path');
const webpack = require('webpack');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const ENV = require('./env');

const { raw, stringified } = ENV;
const { PUBLIC_PATH } = raw;

module.exports = {
  target: 'node',
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: path.resolve('src/__ssr/index.js'),
  output: {
    path: path.resolve('server'),
    filename: 'htmlTemplate.[chunkhash:8].js',
    publicPath: PUBLIC_PATH,
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {},
    plugins: [
      new ModuleScopePlugin(path.resolve('src'), path.resolve('package.json')),
    ],
    modules: [
      path.resolve('node_modules'),
    ],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/images/[name].[hash:8].[ext]',
            }
          },
          { 
            test: [/\.woff2$/, /\.woff$/, /\.eot$/, /\.ttf$/, /\.otf$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/font/[name].[hash:8].[ext]',
            }
          },
          {
            test: /\.jsx?$/,
            include: path.resolve('src'),
            loader: require.resolve('babel-loader'),
            options: {
              presets: [
                ['@babel/preset-env', { modules: false, debug: true, useBuiltIns: 'usage', corejs: 3 }],
                '@babel/preset-react',
              ],
              plugins: [
                ['@babel/plugin-transform-runtime', { corejs: 3 }],
                '@babel/plugin-syntax-dynamic-import',
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                '@babel/plugin-proposal-export-default-from',
                '@babel/plugin-proposal-export-namespace-from',
                ['@babel/plugin-proposal-class-properties', { loos: true }],
                './no-require-css.js',
                './no-require-less.js',
              ],
              cacheDirectory: true,
              cacheCompression: false,
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      ...stringified,
      __SERVER__: true,
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['htmlTemplate*'],
    }),
  ]
}