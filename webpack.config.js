const path = require('path');

module.exports = {
    entry: './frontend/zephyr.jsx',
    output: {
        path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: [/\.jsx?$/],
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/env', '@babel/react', {
                        'plugins': ['@babel/plugin-proposal-class-properties']
                    }]
                }
            },
            {
                test: /\.css$/i,
				loader: 'style-loader',
            },
            {
                test: /\.css$/i,
                use: 'css-loader',
            },
        ]
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '*'],
    },
    plugins:[
        new webpack.DefinePlugin({
          'process.env':{
            'NODE_ENV': JSON.stringify('production')
          }
      }),
    ]
};