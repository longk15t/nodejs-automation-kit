import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { fileURLToPath } from 'url';

import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const entries = {};
const srcDir = path.resolve(__dirname, 'src');
fs.readdirSync(srcDir).forEach((file) => {
  if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
    const name = file.replace(/\.ts$/, '');
    entries[name] = `./src/${file}`;
  }
});

export default {
  mode: 'production',
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  target: 'web',
  externals: /^(k6|https?\:\/\/)(\/.*)?/,
  stats: {
    colors: true,
  },
  plugins: [new CleanWebpackPlugin()],
  optimization: {
    minimize: false,
  },
};
