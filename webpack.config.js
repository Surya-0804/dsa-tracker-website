const path = require('path');

module.exports = {
    entry: './src/index.js', // Assuming your entry point is index.js in the src folder
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        fallback: {
            "zlib": false, // Disabling zlib, you can remove this if not needed
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util/"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "assert": require.resolve("assert/") // Ensure assert module is resolved correctly
        },
        // Ensure webpack can resolve .js, .jsx, and other necessary extensions
        extensions: ['.js', '.jsx', '.json']
    },
    module: {
        rules: [
            // Add other loaders as needed for your project
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Example: Use babel-loader for JS and JSX files
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    // Other webpack configurations as needed
};
