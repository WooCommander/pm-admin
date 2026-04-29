import path from 'path';
import { fileURLToPath } from 'url';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('webpack').Configuration} */
export default {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    enforceExtension: false,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.ts$/,
        include: [
          path.resolve(__dirname, 'src'),
          /[\\/]node_modules[\\/]tir-pm-/,
          /[\\/]node_modules[\\/]tir-style-system/,
          /[\\/]node_modules[\\/]tir-pm-toolkit/,
        ],
        resolve: {
          fullySpecified: false,
        },
        type: 'javascript/auto',
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          target: 'es2020',
          tsconfigRaw: {
            compilerOptions: {
              useDefineForClassFields: true,
              isolatedModules: true,
            },
          },
        },
      },
      {
        test: /\.tsx$/,
        include: [
          path.resolve(__dirname, 'src'),
          /[\\/]node_modules[\\/]tir-pm-/,
          /[\\/]node_modules[\\/]tir-style-system/,
          /[\\/]node_modules[\\/]tir-pm-toolkit/,
        ],
        resolve: {
          fullySpecified: false,
        },
        type: 'javascript/auto',
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2020',
          tsconfigRaw: {
            compilerOptions: {
              useDefineForClassFields: true,
              isolatedModules: true,
            },
          },
        },
      },
      {
        test: /\.[cm]?js$/,
        include: [
          /[\\/]node_modules[\\/]tir-pm-/,
          /[\\/]node_modules[\\/]tir-style-system/,
          /[\\/]node_modules[\\/]tir-pm-toolkit/,
        ],
        resolve: {
          fullySpecified: false,
        },
        type: 'javascript/auto',
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              api: 'modern-compiler',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  ignoreWarnings: [
    { module: /node_modules[\\/]tir-pm-/ },
    { module: /node_modules[\\/]tir-style-system/ },
    { message: /export '.*' was not found/ },
  ],
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'public', 
          to: '.', 
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: 'true',
      __VUE_PROD_DEVTOOLS__: 'false',
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
      'process.env': JSON.stringify({}),
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    port: 5179,
    allowedHosts: 'all',
    historyApiFallback: true,
    hot: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
};
