const path = require('path')
const webpack = require('webpack')

const config = (env) => {
  const addPlugin = (add, plugin) => add ? plugin : undefined
  const ifProd = plugin => addPlugin(env.prod, plugin)
  const ifDev = plugin => addPlugin(env.dev, plugin)
  const removeEmpty = array => array.filter(i => !!i)

  console.log(ifDev('webpack/hot/dev-server'))

  return {
    devtool: env.prod ? 'source-map' : 'eval-source-map',
    entry: {
      app: removeEmpty([
        // ifDev('webpack/hot/dev-server'),
        './src/client/index.js'
      ]),
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, "dist"),
      publicPath: ''
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        },
        {
          test: /\.css/,
          loader: 'style-loader!css-loader'
        },
        {
          test: /\.less$/,
          loader: 'style-loader!css-loader!less-loader'
        }
      ]
    },
    plugins: removeEmpty([
      ifDev(new webpack.HotModuleReplacementPlugin()),
      ifDev(new webpack.NoErrorsPlugin()),
      ifDev(new webpack.NamedModulesPlugin()),
    ]),
    resolve: {

    },
    devServer: {
      port: 8080,
      host: '0.0.0.0',
      contentBase: 'dist',
      hot: true,
      inline: true,
      historyApiFallback: true
    },
  }

}




module.exports = config
