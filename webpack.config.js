// webpack.config.js
  
      const webpack = require('webpack');
      const path = require('path');
      const nodeExternals = require('webpack-node-externals')
      
      module.exports = (env, options) => {
        let config = {
          entry: './src/app.ts',
          output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app.js'
          },
          target: 'node',
          node: {
            __dirname: false,   // if you don't put this is, __dirname
            __filename: false,  // and __filename return blank or /
          },
          externals: [
            nodeExternals()
          ],
          resolve: {
            extensions: [".ts"]
          },
          module: {
            rules: [
            {
              test: /.ts$/,
              use: ['ts-loader']
            }
            ]
          }
        }
        return config;
      }