var path = require('path');

module.exports = {
    entry: "./src/server.js",
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "build.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            }
        ]
    }
}
