/* global process */
/* eslint no-undef: "error" */
import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import CompressionPlugin from 'compression-webpack-plugin'
import { execSync } from 'child_process'
import commonConfig from './webpack.config.js'
import autoprefixer from 'autoprefixer'
import path from 'path'

process.noDeprecation = true


export default () => {
  return webpackMerge(commonConfig(), {
    output: {
      path:       path.resolve(__dirname, './public'),
      filename:   '[name].[hash:7].js',
      publicPath: '/public'
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        options:  {
          postcss: [
            autoprefixer(),
          ]
        },
        minimize: true,
        debug:    false
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name:      'vendor',
        minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
      }),

      new webpack.optimize.UglifyJsPlugin({
        beautify:  false,
        comments:  false,
        sourceMap: false,
        compress:  {
          sequences:    true,
          booleans:     true,
          loops:        true,
          unused:       true,
          drop_console: false,
          dead_code:    true,
          conditionals: false,
          if_return:    false,
          join_vars:    false,
          warnings:     false,
          unsafe:       false,
          keep_fnames:  true
        },
        mangle:    {
          except:      ['$'],
          screw_ie8:   true,
          keep_fnames: true
        },
        output:    {
          comments: false
        }
      }),

      new CompressionPlugin({
        asset:     '[path].gz[query]',
        algorithm: 'gzip',
        test:      /\.js$|\.html$/,
        threshold: 10240,
        minRatio:  0.8
      })
    ]
  })
}
