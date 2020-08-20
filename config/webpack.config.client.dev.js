const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ENV = require('./env');

const { raw, stringified } = ENV;
const { PUBLIC_PATH } = raw;

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: path.resolve('src/index.js'),
  output: {
    path: path.resolve('build'),
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: PUBLIC_PATH,
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
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      name: true,
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
        }
      }
    },
    runtimeChunk: true,
  },
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
              ],
              cacheDirectory: true,
              cacheCompression: false,
            }
          },
          {
            test: /\.css$/,
            loaders: [
              MiniCssExtractPlugin.loader,
              require.resolve('css-loader'),
              require.resolve('postcss-loader'),
            ],
          },
          {
            test: /\.less$/,
            loaders: [
              MiniCssExtractPlugin.loader,
              require.resolve('css-loader'),
              require.resolve('postcss-loader'),
              require.resolve('less-loader'),
            ],
          },
        ],
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      ...stringified,
      __SERVER__: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new ManifestPlugin({fileName: path.resolve('build/manifest.json')}),
    new CaseSensitivePathsPlugin(),
  ],
}