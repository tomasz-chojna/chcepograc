var path = require('path');
var fs = require('fs');

module.exports = {
    mode: 'production',

    entry: './js/app.js',

    output: {
        path: path.resolve(__dirname, '../target/classes/public/js/'),
        filename: 'bundle.js',
    },

    resolve: {
        modules: ['node_modules']
    },

    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                options: {
                    babelrc: true,
                    presets: [
                        ["react"],
                        ["es2015"],
                        ["stage-0"]
                    ],
                    plugins: ["transform-decorators-legacy"]
                },
            },
        ]
    }
};
