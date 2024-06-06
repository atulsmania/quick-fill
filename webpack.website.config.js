const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: path.join(__dirname, 'src', 'website', 'index.jsx'),
  },
  output: {
    filename: 'bundle.js', // Name of the output bundle
    path: path.resolve(__dirname, 'dist'), // Output directory
    clean: true, // Cleans the output directory before each build (optional)
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Rule for handling JavaScript and JSX files
        exclude: /node_modules/, // Exclude node_modules folder
        use: {
          loader: 'babel-loader', // Use Babel loader for transpiling
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Babel presets
          },
        },
      },
      {
        test: /\.css$/, // Rule for handling CSS files
        use: ['style-loader', 'css-loader'], // Loaders for processing CSS
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/website/index.html', // Path to your HTML template
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve extensions for import statements
  },
};
