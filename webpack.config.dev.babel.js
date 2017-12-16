/* global process */
/* eslint no-undef: "error" */
import webpack from 'webpack'
import webpackMerge from 'webpack-merge'
import commonConfig from './webpack.config.js'
import autoprefixer from 'autoprefixer'
import path from 'path'

process.noDeprecation = true

export default () => {
  return webpackMerge(commonConfig(), {
    output: {
      path:       path.resolve(__dirname, 'build'),
      filename:   'bundle.js',
      publicPath: '/'
    },

    devtool: 'source-map',

    devServer: {
      historyApiFallback: true
    },

    module: {
      rules: [{
        enforce: 'pre',
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        use:     [{
          loader: 'eslint-loader',
        }],
      },]
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({
        options:  {
          postcss: [
            autoprefixer(),
          ]
        },
        minimize: false,
        debug:    true
      })
    ]
  })
}
