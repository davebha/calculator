

//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//require('default-passive-events');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },

            {
                test: /\.css$/,
                //include: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ],
    },
    // plugins: [
    //     new new MiniCssExtractPlugin({
    //         filename: isDev ? '[name].css' : '[name].[hash].css',
    //         chunkFilename: isDev ? '[id].css' : '[id].[hash].css',
    //     }),
    // ],
};
