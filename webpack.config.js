import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { execSync } from 'child_process'

process.noDeprecation = true


export default () => ({
  entry: {
    bundle: './src/index.js'
  },

  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ]
  },

  module: {
    rules: [
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        use:  [
          {
            loader: 'babel-loader',
            query:   {
              retainLines: true,
              cacheDirectory: false,
            },
          },
        ],
      },

      {
        test: /\.(c|sa|sc)ss$/,
        use:  [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.(png|jpg|jpeg)$/,
        use:  [
          {
            loader:  'url-loader',
            options: {
              name: 'images/[name].[hash:7].[ext]',
              limit: 10000
            }
          }
        ]
      },

      {
        test:    /\.(svg|eot|ttf|woff|woff2)$/,
        loader:  'file-loader',
        options: {
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    new HtmlWebpackPlugin({
      template:       './src/index.ejs',
      chunksSortMode: 'dependency'
    }),
  ]
})
