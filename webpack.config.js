const path = require('path');

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      }
    ]
  }
  // devServer: {
  //   contentBase: path.join(__dirname, '/dist'),
  //   publicPath: '/dist/',
  //   port: 8080,
  //   historyApiFallback: true,
  // proxy: [
  //   {
  //     context: ['/api', '/auth'],
  //     target: 'http://localhost:8080'
  //   }
  // ]
  // }
};
