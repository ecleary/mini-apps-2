const path = require('path');

const SRC_DIR = path.join(__dirname, './client/src');
const TGT_DIR = path.join(__dirname, './public');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    path: TGT_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
    ],
  },
};
