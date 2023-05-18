## Webpack Configuration

The plugin is only tested with webpack. Here's a sample webpack configuration that helps webpack understand how to load and process .vue, .css, and .scss files. It also sets up an HTML plugin for webpack.

```javascript
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-web-component.js',
  },
  module: {
    rules: [
      {
        test: /\.(vue|ce\.vue)$/,
        loader: 'vue-loader',
        options: {
            customElement: true,
        },
      },
      {
        test: /\.(css|scss)$/,
        oneOf: [
          {
            resourceQuery: /raw/,
            use: [
              'to-string-loader',
              'css-loader',
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  sassOptions: {
                    indentedSyntax: false, // Use the SCSS syntax
                  },
                },
              },
            ],
          },
          {
            use: [
              'style-loader',
              'css-loader',
              'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  sassOptions: {
                    indentedSyntax: false, // Use the SCSS syntax
                  },
                },
              },
            ],
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js',
    },
    extensions: ['.js', '.vue', '.json'],
  },
};

```