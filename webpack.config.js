const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await
    './client/index.js'
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      // {
      //   test: /\.png$/,
      //   use: ['url-loader', 'file-loader']
      // },
      // {
      //   test: /\.css$/, // use the style-loader/css-loader combos for anything matching the .css extension
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //   ]
      // }
    ]
  }
}
