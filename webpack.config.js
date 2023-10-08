const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  output: { path: path.resolve(__dirname, "dist") },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    {
      test: /\.(js|jsx|mjs)$/,
      include: paths.appSrc,
      loader: require.resolve("babel-loader"),
      options: {
        plugins: [
          [
            "module-resolver",
            {
              root: ["./src"],
              alias: {
                "*": ".",
                "@root": "./",
                "@src": "./src",
                "@components": "./src/components",
                "@base": "./src/components/base",
              },
            },
          ],
        ],
        cacheDirectory: true,
      },
    },
  ],
};
